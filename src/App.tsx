import React, {useEffect} from "react";
import "./App.scss"
import {Avatar, Divider, IconButton, Paper, ThemeProvider} from "@mui/material";
import {darkTheme, lightTheme} from "@/theme";
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import {NavLink, Outlet, useNavigation} from "react-router-dom";
import AppLoading from "@/components/loading/app-loading";
import {useRecoilState} from "recoil";
import {themeState} from "@/hooks/states";
import localforage from "localforage";
import {changeThemeCMD, exitAppCMD} from "@/services/cmds";
import {enqueueSnackbar} from "notistack";
import useMediaQuery from "@mui/material/useMediaQuery";

const App: React.FC = () => {
    const navigation = useNavigation();
    const [theme, setTheme] = useRecoilState(themeState);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

    useEffect(() => {
        const t = theme === "null" ? prefersDarkMode ? "dark" : "light" : theme === "light" ? "light" : "dark"
        setTheme(t)
        localforage.setItem("theme", t).then()
    }, [])


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
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            {navigation.state === "loading" ?
                <Paper className="app-loading">
                    <AppLoading/>
                </Paper> :
                <Paper className="app">
                    <div className="app-left">
                        <div className="left-menu">
                            <div className="menu-top">
                                <Avatar
                                    src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/ee/ee9bec135af7d95286079666ab1f022c8b5cc17e_full.jpg"/>
                                <NavLink to="/home">
                                    <IconButton size="large">
                                        <HomeIcon/>
                                    </IconButton>
                                </NavLink>
                                <NavLink to="/zip">
                                    <IconButton size="large">
                                        <FolderIcon/>
                                    </IconButton>
                                </NavLink>
                                <NavLink to="/setting">
                                    <IconButton size="large">
                                        <SettingsIcon/>
                                    </IconButton>
                                </NavLink>
                            </div>
                            <div className="menu-bottom">
                                <IconButton onClick={() => changeTheme()}>
                                    {theme === 'light' ? <DarkModeIcon/> : <LightModeIcon/>}
                                </IconButton>
                                <IconButton size="large" onClick={() => exitAppCMD()}>
                                    <PowerSettingsNewIcon/>
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