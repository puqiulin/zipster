use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FileInfoResponse {
    #[serde(rename(serialize = "fileName"))]
    pub file_name: String,
    #[serde(rename(serialize = "fileType"))]
    pub file_type: String,
    #[serde(rename(serialize = "fileSize"))]
    pub file_size: u64,
}
