use crate::app::handler::Handler;
use crate::app::payload::ChangeThemeParam;
use crate::app::windows;
use crate::handle_result;
use tauri::{api, command, Invoke, Manager, Runtime};

type CmdResult<T = ()> = Result<T, String>;

pub fn cmds<R: Runtime>() -> fn(Invoke<R>) {
    tauri::generate_handler![change_theme, exit_app]
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
