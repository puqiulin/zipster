import React from "react";
import {Divider, IconButton, Switch, Typography} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./index.scss"
import {useTheme} from "@/hooks/use-theme";
import {useFollowSystemTheme} from "@/hooks/use-follow-system-theme";
import {darkTheme, lightTheme} from "@/theme";
import {emit} from "@tauri-apps/api/event";
import {enqueueSnackbar} from "notistack";

const ChangeTheme: React.FC = () => {
    const {theme, setTheme} = useTheme();
    const {isFollowSystemTheme, setIsFollowSystemTheme} = useFollowSystemTheme()
    const color = theme === "light" ? lightTheme.palette.text.secondary : darkTheme.palette.text.secondary

    // NotMainThread("\"apply_vibrancy()\" can only be used on the main thread
    // const changeTheme = () => {
    //     emit("change-theme", {theme: theme === "light" ? "dark" : "light"}).then().catch(e => {
    //         enqueueSnackbar("Change theme error: " + JSON.stringify(e), {
    //             variant: "error",
    //         })
    //     })
    // }

    return (
        <div className="change-theme-box">
            {!isFollowSystemTheme && <IconButton
                disabled={isFollowSystemTheme}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                {theme === 'light' ? <DarkModeIcon className="MuiSvgIcon-colorCustom"/> :
                    <LightModeIcon className="MuiSvgIcon-colorCustom"/>}
            </IconButton>
            }
            <Divider orientation="vertical"/>
            <Switch checked={isFollowSystemTheme} onChange={e => setIsFollowSystemTheme(e.target.checked)}/>
            <Typography sx={{color: color}} variant="subtitle2">Follow System</Typography>
        </div>
    );
}

export default ChangeTheme;