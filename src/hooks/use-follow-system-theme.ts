import {useEffect} from "react";
import localforage from "localforage";
import {enqueueSnackbar} from "notistack";
import {isFollowSystemThemeState} from "@/services/states";
import {useRecoilState} from "recoil";
import {useTheme} from "@/hooks/use-theme";

export const useFollowSystemTheme = () => {
    const [isFollowSystemTheme, setIsFollowSystemTheme] = useRecoilState(isFollowSystemThemeState)
    const {setTheme} = useTheme()
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"

    useEffect(() => {
        localforage.setItem("isFollowSystemTheme", isFollowSystemTheme).then().catch(e => {
            enqueueSnackbar("update follow system theme error: " + JSON.stringify(e), {
                variant: "error",
            })
        })
        if (isFollowSystemTheme) {
            setTheme(prefersColorScheme)
        }
    }, [isFollowSystemTheme])


    return {isFollowSystemTheme, setIsFollowSystemTheme}
}