#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod app;
mod features;
mod utils;

use crate::app::cmds::cmds;
use crate::app::setup::setup;
use tauri::Builder;

#[tokio::main]
async fn main() {
    let mut builder = Builder::default().setup(setup).invoke_handler(cmds());

    builder.run(tauri::generate_context!()).unwrap();
}
