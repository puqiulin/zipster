#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod app;
mod features;
mod utils;

use crate::app::cmds::cmds;
use crate::app::handler::Handler;
use crate::app::setup::setup;
use anyhow::Context;
use tauri::{Builder, Event, Manager};
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

#[tokio::main]
async fn main() {
    let mut builder = Builder::default().setup(setup).invoke_handler(cmds());

    builder.run(tauri::generate_context!()).unwrap();
}
