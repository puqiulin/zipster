use crate::features::zip::Zip;
use anyhow::{bail, Result};
use once_cell::sync::OnceCell;
use std::fs;
use std::fs::File;
use std::path::Path;
use zip::ZipArchive;

pub struct Zipster {
    // zip:.zip(c/dc),.jar(c/dc)
    // sevenz-rust:.7z(c/dc)
    // unrar:.rar(c)
    // tar:.tar(c/dc)
    // flate2:.gz(c/dc)
    // bzip2:.bz2(c/dc)
}

impl Zipster {
    pub fn global() -> &'static Self {
        static ZIPSTER: OnceCell<Zipster> = OnceCell::new();
        ZIPSTER.get_or_init(|| Zipster {})
    }

    pub fn decompression(&self, file_path: &Path) -> Result<()> {
        let extension = file_path
            .extension()
            .expect("Unsupported file extension")
            .to_str()
            .expect("Failed file extension to str");

        match extension {
            "zip" | "jar" => Zip::global().unzip(file_path),
            "7z" => Ok(()),
            "tar" => Ok(()),
            "gz" => Ok(()),
            "bz2" => Ok(()),
            _ => bail!("Unsupported file extension"),
        }
    }

    pub fn compression(
        &self,
        compression_type: &str,
        files_path: Vec<&Path>,
        save_path: &Path,
        file_name: &str,
    ) -> Result<()> {
        match compression_type {
            "zip" => Zip::global().zip(files_path, save_path, file_name),
            "7z" => Ok(()),
            "rar" => Ok(()),
            "tar" => Ok(()),
            "gz" => Ok(()),
            "bz2" => Ok(()),
            _ => bail!("Unsupported file compressed format"),
        }
    }
}
