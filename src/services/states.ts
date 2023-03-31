import {atom} from "recoil";
import fileInfo = CmdResponseType.fileInfo;
import localforage from "localforage";
import {enqueueSnackbar} from "notistack";

type Theme = "dark" | "light"
const defaultTheme = (): Theme => {
    localforage.getItem("isFollowSystemTheme").then(value => {
        if (value !== null && value) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
        }
    }).catch(e => {
        enqueueSnackbar("get is follow system theme error: " + JSON.stringify(e), {
            variant: "error",
        })
    })
    return "light"
}

const defaultFollowSystem = (): boolean => {
    localforage.getItem("isFollowSystemTheme").then(value => {
        return value === null ? true : value
    }).catch(e => {
        enqueueSnackbar("get theme error: " + JSON.stringify(e), {
            variant: "error",
        })
    })
    return true;
}

export const isFollowSystemThemeState = atom<boolean>({
    key: 'isFollowSystemThemeState',
    default: defaultFollowSystem(),
});

export const themeState = atom<"light" | "dark">({
    key: 'themeState',
    default: defaultTheme(),
});

export const compressionConfirmDialogState = atom<boolean>({
    key: 'compressionConfirmDialogState',
    default: false,
});

export const deCompressionFileInfoState = atom<fileInfo | undefined>({
    key: 'deCompressionFileInfoState',
    default: undefined,
});

export const compressionFilesInfoState = atom<fileInfo[]>({
    key: 'compressionFilesInfoState',
    default: [] as fileInfo[],
});

export const compressionTypeState = atom<string>({
    key: 'compressionTypeState',
    default: "zip",
});
