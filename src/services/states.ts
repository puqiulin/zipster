import {atom} from "recoil";
import * as localforage from "localforage";
import useMediaQuery from '@mui/material/useMediaQuery';


export const themeState = atom<string>({
    key: 'themeState',
    default: localforage.getItem("theme").then() || "null",
});
