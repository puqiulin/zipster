import React, {useEffect, useState} from "react";
import "./App.scss"
import {Divider, IconButton, Paper, ThemeProvider, useMediaQuery} from "@mui/material";
import {darkTheme, lightTheme} from "@/theme";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {NavLink, Outlet} from "react-router-dom";
import {exitAppCMD} from "@/services/cmds";
import GitHubIcon from '@mui/icons-material/GitHub';
import {open} from '@tauri-apps/api/shell';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import {menuSelectedStyle} from "@/utils/constants";
import {useTheme} from "@/hooks/use-theme";
import {useFollowSystemTheme} from "@/hooks/use-follow-system-theme";

const App: React.FC = () => {
    const {isFollowSystemTheme} = useFollowSystemTheme()
    const {theme, setTheme} = useTheme();
    const [selectMenu, setSelectMenu] = useState<string>("home")
    const prefersColorScheme = useMediaQuery('(prefers-color-scheme: dark)') ? "dark" : "light"

    useEffect(() => {
        isFollowSystemTheme && setTheme(prefersColorScheme)
    }, [prefersColorScheme])

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <Paper className="app">
                <div className="app-left">
                    <div className="left-menu">
                        <div className="menu-top">
                            <IconButton size="large" onClick={async () => {
                                await open("https://github.com/one0day/zipster")
                            }}>
                                <GitHubIcon className="MuiSvgIcon-colorCustom"/>
                            </IconButton>
                            <NavLink to="/home">
                                <IconButton
                                    sx={{boxShadow: selectMenu === "home" ? menuSelectedStyle : ""}}
                                    size="large"
                                    onClick={() => setSelectMenu("home")}>
                                    <HomeIcon
                                        className="MuiSvgIcon-colorCustom"/>
                                </IconButton>
                            </NavLink>
                            <NavLink to="/decompression">
                                <IconButton sx={{boxShadow: selectMenu === "decompression" ? menuSelectedStyle : ""}}
                                            size="large"
                                            onClick={() => setSelectMenu("decompression")}>
                                    <DriveFileMoveIcon
                                        className="MuiSvgIcon-colorCustom"/>
                                </IconButton>
                            </NavLink>
                            <NavLink to="/compression">
                                <IconButton sx={{boxShadow: selectMenu === "compression" ? menuSelectedStyle : ""}}
                                            size="large"
                                            onClick={() => setSelectMenu("compression")}>
                                    <FolderZipIcon
                                        className="MuiSvgIcon-colorCustom"/>
                                </IconButton>
                            </NavLink>
                        </div>
                        <div className="menu-bottom">
                            <NavLink to="/settings">
                                <IconButton sx={{boxShadow: selectMenu === "settings" ? menuSelectedStyle : ""}}
                                            size="large"
                                            onClick={() => setSelectMenu("settings")}>
                                    <SettingsIcon
                                        className="MuiSvgIcon-colorCustom"/>
                                </IconButton>
                            </NavLink>
                            <IconButton size="large" onClick={() => exitAppCMD()}>
                                <PowerSettingsNewIcon
                                    className="MuiSvgIcon-colorCustom"/>
                            </IconButton>
                        </div>
                    </div>
                </div>
                <Divider orientation="vertical"/>
                <div className="app-right">
                    <Outlet/>
                </div>
            </Paper>
        </ThemeProvider>
    );
}

export default App;