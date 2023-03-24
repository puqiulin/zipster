use crate::app::cmds::CmdResult;
use crate::app::handler::Handler;
use crate::app::payload::{ChangeThemeParam, OpenParam};
use crate::app::windows;
use crate::handle_result;
use tauri::api;
use tauri::command;

#[command]
pub async fn open(payload: OpenParam) -> CmdResult {
    handle_result!(open::that(payload.path))
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
