use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FileInfoResponse {
    pub name: String,
    pub extension: String,
    pub size: Option<u64>,
    pub path: String,
    #[serde(rename(serialize = "isDir"))]
    pub is_dir: bool,
}
