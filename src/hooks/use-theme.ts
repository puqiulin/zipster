import {useEffect} from "react";
import localforage from "localforage";
import {enqueueSnackbar} from "notistack";
import {useRecoilState} from "recoil";
import {themeState} from "@/services/states";

export const useTheme = () => {
    const [theme, setTheme] = useRecoilState(themeState)

    useEffect(() => {
        localforage.setItem("theme", theme).then().catch(e => {
            enqueueSnackbar("update theme error: " + JSON.stringify(e), {
                variant: "error",
            })
        })
    }, [theme])

    return {theme, setTheme}
}