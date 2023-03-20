use tauri::Manager;
use window_shadows::set_shadow;
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

use crate::app::handler::Handler;

pub fn init() {
    let main_window = Handler::app_handle().get_window("main").unwrap();
    set_shadow(main_window.clone(), true).unwrap();

    #[cfg(target_os = "macos")]
    //dark and light model
    apply_vibrancy(&main_window, NSVisualEffectMaterial::HudWindow, None, Some(20 as f64)).unwrap();

    #[cfg(target_os = "windows")]
    apply_acrylic(&main_window, Some((18, 18, 18, 125))).unwrap();
}
