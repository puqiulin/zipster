import {createBrowserRouter} from "react-router-dom";
import App from "@/App";
import Zip from "@/pages/zip";
import Setting from "@/pages/setting";
import Home from "@/pages/home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>,
            },
            {
                path: "zip",
                element: <Zip/>,
            },
            {
                path: "home",
                element: <Home/>,
            },
            {
                path: "settings",
                element: <Setting/>,
            },
        ],
    },
]);

export default router;