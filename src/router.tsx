import {createBrowserRouter} from "react-router-dom";
import App from "@/App";
import Zip from "@/pages/zip";
import Setting from "@/pages/setting";
import Home from "@/pages/home";
import AppLoader from "@/components/loading/app-loading";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "zip",
                element: <Zip/>,
            },
            {
                path: "home",
                element: <Home/>,
            },
            {
                path: "setting",
                element: <Setting/>,
            },
        ],
    },
]);

export default router;