import React, {useEffect, useState} from "react";
import {IconButton} from "@mui/material";
import localforage from "localforage";
import "./index.scss"
import PushPinIcon from "@mui/icons-material/PushPin";
import {appWindow} from "@tauri-apps/api/window";
import {enqueueSnackbar} from "notistack";
import {useTheme} from "@/hooks/use-theme";

const PinWindow: React.FC = () => {
    const {theme} = useTheme();
    const [pin, setPin] = useState<boolean>(false)

    useEffect(() => {
        localforage.getItem("piWindow").then(async (pin) => {
            appWindow.setAlwaysOnTop(pin as boolean).then(() => {
                setPin(pin as boolean)
            })
        }).catch(e => {
            enqueueSnackbar("get pin window status error: " + JSON.stringify(e), {
                variant: "error",
            })
        })
    }, [])

    const pinWindow = async () => {
        appWindow.setAlwaysOnTop(!pin).then(async () => {
            localforage.setItem("piWindow", !pin).then(() => {
                setPin(!pin)
            })
        }).catch(e => {
            enqueueSnackbar("set pin window error: " + JSON.stringify(e), {
                variant: "error",
            })
        })
    }

    return (
        <IconButton onClick={() => pinWindow()}>
            <PushPinIcon sx={{color: pin ? "#32CD32" : theme === "light" ? "#000000" : "#ffffff"}}/>
        </IconButton>
    );
}

export default PinWindow;