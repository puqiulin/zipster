use std::sync::Arc;

use once_cell::sync::OnceCell;
use parking_lot::Mutex;
use tauri::{AppHandle, Wry};

#[derive(Debug, Clone)]
pub struct Handler {
    pub app_handle: Arc<Mutex<Option<AppHandle<Wry>>>>,
}

impl Handler {
    pub fn global() -> &'static Handler {
        static HANDLE: OnceCell<Handler> = OnceCell::new();

        HANDLE.get_or_init(|| Handler {
            app_handle: Arc::new(Mutex::new(None)),
        })
    }

    pub fn init(&self, app_handle: AppHandle<Wry>) {
        *self.app_handle.lock() = Some(app_handle);
    }

    pub fn app_handle() -> AppHandle<Wry> {
        Self::global().app_handle.lock().clone().unwrap()
    }
}
