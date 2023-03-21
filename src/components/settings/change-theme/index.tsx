import React from "react";
import {IconButton} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import localforage from "localforage";
import {useRecoilState} from "recoil";
import {themeState} from "@/services/states";
import "./index.scss"

const ChangeTheme: React.FC = () => {
    const [theme, setTheme] = useRecoilState(themeState);

    const changeTheme = async () => {
        const t = theme === "light" ? "dark" : "light"
        setTheme(t)
        await localforage.setItem("theme", t)

        // NotMainThread("\"apply_vibrancy()\" can only be used on the main thread.
        // changeThemeCMD({theme: t}).then(async () => {
        //     await localforage.setItem("theme", t)
        //     enqueueSnackbar('!')
        // }).catch(e => {
        //     enqueueSnackbar(e.toString())
        // })
    }

    return (
        <IconButton onClick={() => changeTheme()}>
            {theme === 'light' ? <DarkModeIcon className="MuiSvgIcon-colorCustom"/> :
                <LightModeIcon className="MuiSvgIcon-colorCustom"/>}
        </IconButton>
    );
}

export default ChangeTheme;