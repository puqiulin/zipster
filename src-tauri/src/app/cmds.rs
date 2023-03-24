use crate::app::cmds_app;
use crate::app::cmds_zipster;
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

pub type CmdResult<T = ()> = Result<T, String>;

pub fn cmds<R: Runtime>() -> fn(Invoke<R>) {
    tauri::generate_handler![
        cmds_zipster::decompression,
        cmds_zipster::compression,
        cmds_zipster::get_file_info,
        cmds_zipster::get_files_info,
        cmds_zipster::get_dir_size,
        cmds_app::open,
        cmds_app::change_theme,
        cmds_app::exit_app,
    ]
}
