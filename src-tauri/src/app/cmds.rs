use crate::app::handler::Handler;
use crate::app::payload::{
    ChangeThemeParam, DecompressionParam, FileInfoParam, FilesInfoParam, OpenParam,
};
use crate::app::response::FileInfoResponse;
use crate::app::windows;
use crate::handle_result;
use crate::utils::files;
use crate::utils::zipster::Zipster;
use std::path::PathBuf;
use tauri::{api, command, Invoke, Manager, Runtime};

type CmdResult<T = ()> = Result<T, String>;

pub fn cmds<R: Runtime>() -> fn(Invoke<R>) {
    tauri::generate_handler![
        exit_app,
        change_theme,
        open,
        decompression,
        get_file_info,
        get_files_info
    ]
}

#[command]
pub async fn exit_app() -> CmdResult {
    api::process::kill_children();
    Handler::app_handle().exit(0);
    Ok(())
}

#[command]
pub async fn change_theme(payload: ChangeThemeParam) -> CmdResult {
    handle_result!(windows::change_theme(payload.theme).await)
}

#[command]
pub async fn decompression(payload: DecompressionParam) -> CmdResult {
    let pathbuf = PathBuf::from(payload.file_path.clone());
    handle_result!(Zipster::unzip(
        payload.file_path.as_str(),
        pathbuf
            .parent()
            .expect("Invalid parent file path")
            .to_str()
            .expect("Invalid file path")
    ))
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
