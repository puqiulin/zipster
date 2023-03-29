use anyhow::Result;
use once_cell::sync::OnceCell;
use std::fs;
use std::fs::File;
use std::io::{Read, Write};
use std::os::unix::fs::PermissionsExt;
use std::path::{Path, PathBuf};
use walkdir::WalkDir;
use zip::write::FileOptions;
use zip::{CompressionMethod, ZipArchive, ZipWriter};

pub struct Zip {
    // zip:.zip(c/dc),.jar(c/dc)
}

impl Zip {
    pub fn global() -> &'static Self {
        static ZIP: OnceCell<Zip> = OnceCell::new();
        ZIP.get_or_init(|| Zip {})
    }

    //TODO:show compression progress
    pub fn zip(&self, files_path: Vec<&Path>, save_path: &Path, file_name: &str) -> Result<()> {
        let zip_file = File::create(save_path.join(file_name))?;
        let mut zip_option = FileOptions::default().compression_method(CompressionMethod::Deflated);
        let mut zip_writer = ZipWriter::new(zip_file);

        for path in files_path {
            let canonical_path = fs::canonicalize(&path)?;
            let mut file_name = canonical_path
                .file_name()
                .expect("Failed to get file name")
                .to_string_lossy()
                .to_string();

            if canonical_path.is_dir() {
                for entry in WalkDir::new(&canonical_path) {
                    let entry = entry?;
                    let path = entry.path();
                    let path_name = path
                        .strip_prefix(&canonical_path)?
                        .to_string_lossy()
                        .to_string();
                    zip_option =
                        zip_option.unix_permissions(entry.metadata()?.permissions().mode());
                    let dir_path = Path::new(&file_name)
                        .join(&path_name)
                        .to_string_lossy()
                        .to_string();

                    if path.is_dir() {
                        zip_writer.add_directory(dir_path, zip_option)?;
                    } else if path.is_file() {
                        zip_writer.start_file(dir_path, zip_option)?;
                        std::io::copy(&mut File::open(path)?, &mut zip_writer)?;
                    }
                }
            } else if canonical_path.is_file() {
                zip_option = zip_option
                    .unix_permissions(fs::metadata(&canonical_path)?.permissions().mode());
                zip_writer.start_file(file_name, zip_option)?;
                std::io::copy(&mut File::open(canonical_path)?, &mut zip_writer)?;
            }
        }
        zip_writer.finish()?;
        Ok(())
    }

    //TODO:keep contains dir structure
    pub fn unzip(&self, file_path: &Path) -> Result<()> {
        let mut output_dir = file_path
            .parent()
            .expect("Failed to get file parent dir")
            .join(
                file_path
                    .file_stem()
                    .expect("Failed to extract file name")
                    .to_string_lossy()
                    .to_string(),
            );
        if output_dir.exists() {
            let mut index = 1;
            loop {
                let mut output_dir_string = output_dir.to_string_lossy().to_string();
                output_dir_string.push_str(format!("({})", index).as_str());
                let new_output_dir = PathBuf::from(output_dir_string);
                if new_output_dir.exists() {
                    index += 1;
                    continue;
                }
                output_dir = new_output_dir;
                break;
            }
        }
        fs::create_dir_all(&output_dir)?;

        let mut archive = ZipArchive::new(File::open(file_path)?)?;
        for i in 0..archive.len() {
            let mut file = archive.by_index(i)?;
            let out_path = PathBuf::from(&output_dir).join(file.mangled_name());
            if file.is_dir() {
                fs::create_dir_all(&out_path)?;
            } else if file.is_file() {
                if let Some(parent) = out_path.parent() {
                    if !parent.exists() {
                        fs::create_dir_all(&parent)?;
                    }
                }
                std::io::copy(&mut file, &mut File::create(&out_path)?)?;
            }
        }

        Ok(())
    }
}
