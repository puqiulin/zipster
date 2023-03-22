import {invoke} from "@tauri-apps/api/tauri";

export async function exitAppCMD() {
    return invoke("exit_app");
}

export async function openCMD(payload: CmdType.openParam) {
    return invoke<string>("open", {payload});
}

export async function decompressionCMD(payload: CmdType.decompressionParam) {
    return invoke<string>("decompression", {payload});
}

export async function compressionCMD(payload: CmdType.compressionParam) {
    return invoke<string>("compression", {payload});
}

export async function changeThemeCMD(payload: CmdType.changeThemeParam) {
    return invoke<string>("change_theme", {payload});
}

export async function getFileInfoCMD(payload: CmdType.fileInfoParam) {
    return invoke<CmdResponseType.fileInfo>("get_file_info", {payload});
}

export async function getFilesInfoCMD(payload: CmdType.filesInfoParam) {
    return invoke<CmdResponseType.fileInfo[]>("get_files_info", {payload});
}



