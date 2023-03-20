import {invoke} from "@tauri-apps/api/tauri";

export async function changeThemeCMD(payload: CmdType.changeThemeParam) {
    return invoke<string>("change_theme", {payload});
}

export async function exitAppCMD() {
    return invoke("exit_app");
}


