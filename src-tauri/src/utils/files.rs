use crate::app::response::FileInfoResponse;
use anyhow::Result;
use std::fs;
use std::path::{Path, PathBuf};
use walkdir::WalkDir;

pub fn get_file_info(file_path: &Path) -> Result<FileInfoResponse> {
    let file_size = {
        let metadata = file_path.metadata()?;
        if metadata.is_file() {
            Some(metadata.len())
        } else {
            Some(0)
        }
    };
    Ok(FileInfoResponse {
        name: file_path
            .file_name()
            .unwrap_or("".as_ref())
            .to_str()
            .unwrap_or("")
            .to_string(),
        extension: file_path
            .extension()
            .unwrap_or("".as_ref())
            .to_str()
            .unwrap_or("")
            .to_string(),
        size: file_size,
        path: file_path.to_string_lossy().to_string(),
        is_dir: file_path.is_dir(),
    })
}

pub fn get_dir_info(file_path: &Path) -> Result<FileInfoResponse> {
    Ok(FileInfoResponse {
        name: file_path
            .file_name()
            .unwrap_or("".as_ref())
            .to_str()
            .unwrap_or("")
            .to_string(),
        extension: file_path
            .extension()
            .unwrap_or("".as_ref())
            .to_str()
            .unwrap_or("")
            .to_string(),
        size: Some(0),
        path: file_path.to_string_lossy().to_string(),
        is_dir: file_path.is_dir(),
    })
}

pub fn get_files_info(files_path: Vec<&Path>) -> Result<Vec<FileInfoResponse>> {
    Ok(files_path
        .iter()
        .map(|f| get_file_info(f).expect("get file info failed"))
        .collect::<Vec<FileInfoResponse>>())
}

//TODO:use tokio performance optimization
pub fn get_dir_files_size(dir_path: &Path) -> Result<u64> {
    let mut total_size = 0;

    for entry in WalkDir::new(dir_path) {
        let metadata = entry?.metadata()?;
        if metadata.is_file() {
            total_size += metadata.len();
        }
    }

    Ok(total_size)
}
