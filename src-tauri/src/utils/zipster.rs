use anyhow::Result;
use std::fs;
use std::fs::File;
use std::path::Path;
use zip::ZipArchive;

pub struct Zipster {
    // zip:.zip(c/dc),.jar(c/dc)
    // tar:.tar(c/dc)
    // flate2:.gz(c/dc)
    // bzip2:.bz2(c/dc)
    // sevenz-rust:.7z(c/dc)
    // unrar:.rar(c)
}

impl Zipster {
    pub fn zip(input_file_path: &str, output_file_path_dir: &str) -> Result<()> {
        Ok(())
    }

    pub fn unzip(input_file_path: &str, output_file_path_dir: &str) -> Result<()> {
        let file = File::open(input_file_path)?;
        let mut archive = ZipArchive::new(file)?;

        for i in 0..archive.len() {
            let mut file = archive.by_index(i)?;
            let out_path = Path::new(output_file_path_dir).join(file.name());

            let mut out_file = File::create(&out_path)?;
            std::io::copy(&mut file, &mut out_file)?;
        }

        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use crate::utils::zipster::Zipster;
    use anyhow::Result;

    #[test]
    pub fn test_unzip() -> Result<()> {
        Zipster::unzip(
            "/Users/oneday/work/self/tauri/zipster/src-tauri/src/utils/test.zip",
            "/Users/oneday/work/self/tauri/zipster/src-tauri/src/utils/",
        )
    }
}
