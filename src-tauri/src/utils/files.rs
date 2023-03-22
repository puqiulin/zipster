use crate::app::response::FileInfoResponse;
use anyhow::Result;
use std::fs;
use std::path::Path;

pub fn get_file_info(file_path: &str) -> Result<FileInfoResponse> {
    let file_path = Path::new(file_path);
    Ok(FileInfoResponse {
        file_name: file_path
            .file_name()
            .unwrap_or("".as_ref())
            .to_str()
            .unwrap_or("")
            .to_string(),
        file_type: file_path
            .extension()
            .unwrap_or("".as_ref())
            .to_str()
            .unwrap_or("")
            .to_string(),
        file_size: file_path.metadata()?.len(),
    })
}

pub fn get_files_info(files_path: Vec<&str>) -> Result<Vec<FileInfoResponse>> {
    Ok(files_path
        .iter()
        .map(|f| get_file_info(f).expect("get file info failed"))
        .collect::<Vec<FileInfoResponse>>())
}
