use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ChangeThemeParam {
    pub theme: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct DecompressionParam {
    #[serde(rename(deserialize = "filePath"))]
    pub file_path: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct CompressionParam {
    #[serde(rename(deserialize = "filesPath"))]
    pub files_path: Vec<String>,
    #[serde(rename(deserialize = "compressionFormat"))]
    pub compression_format: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct OpenParam {
    pub path: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FileInfoParam {
    #[serde(rename(deserialize = "filePath"))]
    pub file_path: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct DirPathParam {
    #[serde(rename(deserialize = "dirPath"))]
    pub dir_path: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FilesInfoParam {
    #[serde(rename(deserialize = "filesPath"))]
    pub files_path: Vec<String>,
}
