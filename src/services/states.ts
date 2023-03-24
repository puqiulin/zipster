import {atom} from "recoil";
import * as localforage from "localforage";
import fileInfo = CmdResponseType.fileInfo;

export const themeState = atom<string>({
    key: 'themeState',
    default: localforage.getItem("theme").then() || "null",
});

export const compressionConfirmDialogState = atom<boolean>({
    key: 'compressionConfirmDialogState',
    default: false,
});

export const compressionFilesState = atom<string[]>({
    key: 'compressionFilesState',
    default: [],
});

export const compressionFilesInfoState = atom<fileInfo[]>({
    key: 'compressionFilesInfoState',
    default: [] as fileInfo[],
});

export const compressionTypeState = atom<string>({
    key: 'compressionTypeState',
    default: "zip",
});
