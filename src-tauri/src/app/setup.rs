use crate::app::handler::Handler;
use crate::app::windows;
use tauri::{App, Wry};

pub fn setup(app: &mut App<Wry>) -> Result<(), Box<dyn std::error::Error>> {
    Handler::global().init(app.handle());
    windows::init();

    Ok(())
}
