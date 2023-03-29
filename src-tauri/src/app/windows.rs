use crate::app::handler::Handler;
use anyhow::{anyhow, bail, Context, Result};
use tauri::Manager;
use window_shadows::set_shadow;
use window_vibrancy::{apply_acrylic, apply_vibrancy, NSVisualEffectMaterial};

pub fn init() {
    let main_window = Handler::app_handle().get_window("main").unwrap();
    set_shadow(main_window.clone(), true).unwrap();

    // #[cfg(target_os = "macos")]
    // apply_vibrancy(
    //     &main_window,
    //     NSVisualEffectMaterial::FullScreenUI,
    //     None,
    //     Some(20 as f64),
    // )
    // .unwrap();

    // #[cfg(target_os = "windows")]
    // apply_acrylic(&main_window, Some((18, 18, 18, 125))).unwrap();
}

// NotMainThread("\"apply_vibrancy()\" can only be used on the main thread.
pub async fn change_theme(theme: String) -> Result<()> {
    let main_window = Handler::app_handle()
        .get_window("main")
        .context("get window failed");

    let theme = match theme.as_str() {
        "light" => NSVisualEffectMaterial::Titlebar,
        "dark" => NSVisualEffectMaterial::UnderPageBackground,
        _ => NSVisualEffectMaterial::Titlebar,
    };

    #[cfg(target_os = "macos")]
    apply_vibrancy(&main_window?, theme, None, Some(20 as f64)).expect("set window theme failed");

    Ok(())
}
