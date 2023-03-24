use crate::app::response::FileInfoResponse;
use anyhow::Result;
use std::fs;
use std::path::{Path, PathBuf};

pub fn get_file_info(file_path: &str) -> Result<FileInfoResponse> {
    let file_path = Path::new(file_path);

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
        size: Some(file_path.metadata()?.len()),
        path: file_path.to_string_lossy().to_string(),
        is_dir: file_path.is_dir(),
    })
}

pub fn get_dir_info(file_path: &str) -> Result<FileInfoResponse> {
    let file_path = Path::new(file_path);

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
        size: None,
        path: file_path.to_string_lossy().to_string(),
        is_dir: file_path.is_dir(),
    })
}

pub fn get_files_info(files_path: Vec<&str>) -> Result<Vec<FileInfoResponse>> {
    Ok(files_path
        .iter()
        .map(|f| get_file_info(f).expect("get file info failed"))
        .collect::<Vec<FileInfoResponse>>())
}

pub fn get_dir_files_size(dir_path: &Path) -> Result<u64> {
    let mut total_size = 0;

    for f in fs::read_dir(dir_path)? {
        let entry = f?;
        let metadata = entry.metadata()?;

        if metadata.is_file() {
            total_size += metadata.len();
        } else if metadata.is_dir() {
            total_size += get_dir_files_size(&entry.path())?;
        }
    }

    Ok(total_size)
}
