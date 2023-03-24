use anyhow::Result;
use once_cell::sync::OnceCell;
use std::fs;
use std::fs::File;
use std::path::{Path, PathBuf};
use zip::ZipArchive;

pub struct Zip {
    // zip:.zip(c/dc),.jar(c/dc)
}

impl Zip {
    pub fn global() -> &'static Self {
        static ZIP: OnceCell<Zip> = OnceCell::new();
        ZIP.get_or_init(|| Zip {})
    }

    pub fn zip(&self, files_path: Vec<&str>) -> Result<()> {
        Ok(())
    }

    pub fn unzip(&self, file_path: &str) -> Result<()> {
        let file_path = Path::new(file_path);
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
        fs::create_dir_all(output_dir.clone())?;

        let mut archive = ZipArchive::new(File::open(file_path)?)?;
        for i in 0..archive.len() {
            let mut file = archive.by_index(i)?;

            let mut out_file = File::create(output_dir.join(file.name()))?;
            std::io::copy(&mut file, &mut out_file)?;
        }

        Ok(())
    }
}
