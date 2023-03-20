use tauri::{Invoke, Manager, Runtime, command};
use crate::app::handler::Handler;

type CmdResult<T = ()> = Result<T, String>;

pub fn cmds<R: Runtime>() -> fn(Invoke<R>) {
    tauri::generate_handler![
        test,
    ]
}

#[command]
pub fn test() -> CmdResult {
    Handler::app_handle()
        .get_window("main")
        .unwrap()
        .eval("console.log('asdasd');")
        .unwrap();

    Ok(())
}
