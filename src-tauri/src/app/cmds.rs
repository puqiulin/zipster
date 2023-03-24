use crate::app::handler::Handler;
use crate::app::payload::{
    ChangeThemeParam, CompressionParam, DecompressionParam, DirPathParam, FileInfoParam,
    FilesInfoParam, OpenParam,
};
use crate::app::response::FileInfoResponse;
use crate::app::windows;
use crate::features::zipster::Zipster;
use crate::handle_result;
use crate::utils::files;
use std::path::{Path, PathBuf};
use tauri::{api, command, Invoke, Manager, Runtime};

type CmdResult<T = ()> = Result<T, String>;

pub fn cmds<R: Runtime>() -> fn(Invoke<R>) {
    tauri::generate_handler![
        decompression,
        compression,
        open,
        get_file_info,
        get_files_info,
        get_dir_size,
        change_theme,
        exit_app,
    ]
}

#[command]
pub async fn decompression(payload: DecompressionParam) -> CmdResult {
    handle_result!(Zipster::global().decompression(payload.file_path.as_str()))
}

#[command]
pub async fn compression(payload: CompressionParam) -> CmdResult {
    let files_path = payload
        .files_path
        .iter()
        .map(|f| f.as_str())
        .collect::<Vec<&str>>();
    handle_result!(Zipster::global().compression(files_path, payload.compression_format.as_str()))
}

#[command]
pub async fn open(payload: OpenParam) -> CmdResult {
    handle_result!(open::that(payload.path))
}

#[command]
pub async fn get_file_info(payload: FileInfoParam) -> CmdResult<FileInfoResponse> {
    handle_result!(files::get_file_info(payload.file_path.as_str()))
}

#[command]
pub async fn get_files_info(payload: FilesInfoParam) -> CmdResult<Vec<FileInfoResponse>> {
    let files_path = payload
        .files_path
        .iter()
        .map(|f| f.as_str())
        .collect::<Vec<&str>>();
    handle_result!(files::get_files_info(files_path))
}

#[command]
pub async fn get_dir_size(payload: DirPathParam) -> CmdResult<u64> {
    let dir_path = Path::new(payload.dir_path.as_str());
    handle_result!(files::get_dir_files_size(dir_path))
}

#[command]
pub async fn change_theme(payload: ChangeThemeParam) -> CmdResult {
    handle_result!(windows::change_theme(payload.theme).await)
}

#[command]
pub async fn exit_app() -> CmdResult {
    api::process::kill_children();
    Handler::app_handle().exit(0);
    Ok(())
}
