use crate::app::cmds::CmdResult;
use crate::app::payload::{
    CompressionParam, DecompressionParam, DirPathParam, FileInfoParam, FilesInfoParam,
};
use crate::app::response::FileInfoResponse;
use crate::features::zipster::Zipster;
use crate::handle_result;
use crate::utils::files;
use std::path::Path;
use tauri::command;

#[command]
pub async fn decompression(payload: DecompressionParam) -> CmdResult {
    handle_result!(Zipster::global().decompression(Path::new(&payload.file_path)))
}

#[command]
pub async fn compression(payload: CompressionParam) -> CmdResult {
    handle_result!(Zipster::global().compression(
        payload.compression_type.as_str(),
        payload
            .files_path
            .iter()
            .map(|f| Path::new(f))
            .collect::<Vec<&Path>>(),
        Path::new(&payload.save_path),
        payload.file_name.as_str()
    ))
}

#[command]
pub async fn get_file_info(payload: FileInfoParam) -> CmdResult<FileInfoResponse> {
    handle_result!(files::get_file_info(Path::new(&payload.file_path)))
}

#[command]
pub async fn get_files_info(payload: FilesInfoParam) -> CmdResult<Vec<FileInfoResponse>> {
    let files_path = payload
        .files_path
        .iter()
        .map(|f| Path::new(f))
        .collect::<Vec<&Path>>();
    handle_result!(files::get_files_info(files_path))
}

#[command]
pub async fn get_dir_size(payload: DirPathParam) -> CmdResult<u64> {
    let dir_path = Path::new(payload.dir_path.as_str());
    handle_result!(files::get_dir_files_size(dir_path))
}
