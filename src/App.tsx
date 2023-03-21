import React, {useEffect, useState} from "react";
import "./App.scss"
import {Divider, IconButton, Paper, ThemeProvider} from "@mui/material";
import {darkTheme, lightTheme} from "@/theme";
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {NavLink, Outlet, useNavigation} from "react-router-dom";
import AppLoading from "@/components/loading/app-loading";
import {useRecoilState} from "recoil";
import {themeState} from "@/services/states";
import localforage from "localforage";
import {exitAppCMD} from "@/services/cmds";
import useMediaQuery from "@mui/material/useMediaQuery";
import GitHubIcon from '@mui/icons-material/GitHub';
import {open} from '@tauri-apps/api/shell';

const App: React.FC = () => {
    const navigation = useNavigation();
    const [theme, setTheme] = useRecoilState(themeState);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [selectMenu, setSelectMenu] = useState<string>("home")

    useEffect(() => {
        const t = theme === "null" ? prefersDarkMode ? "dark" : "light" : theme === "light" ? "light" : "dark"
        setTheme(t)
        localforage.setItem("theme", t).then()
    }, [])

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            {navigation.state === "loading" ?
                <Paper className="app-loading">
                    <AppLoading/>
                </Paper> :
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
                                    <IconButton sx={{boxShadow: selectMenu === "home" ? "0 0 5px" : ""}} size="large"
                                                onClick={() => setSelectMenu("home")}>
                                        <HomeIcon
                                            className="MuiSvgIcon-colorCustom"/>
                                    </IconButton>
                                </NavLink>
                                <NavLink to="/zip">
                                    <IconButton sx={{boxShadow: selectMenu === "zip" ? "0 0 5px" : ""}} size="large"
                                                onClick={() => setSelectMenu("zip")}>
                                        <FolderIcon
                                            className="MuiSvgIcon-colorCustom"/>
                                    </IconButton>
                                </NavLink>
                            </div>
                            <div className="menu-bottom">
                                <NavLink to="/settings">
                                    <IconButton sx={{boxShadow: selectMenu === "settings" ? "0 0 5px" : ""}}
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
                    <Divider orientation="vertical" flexItem/>
                    <div className="app-right">
                        <Outlet/>
                    </div>
                </Paper>
            }
        </ThemeProvider>
    );
}

export default App;