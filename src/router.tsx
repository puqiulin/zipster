import {createBrowserRouter} from "react-router-dom";
import App from "@/App";
import Zip from "@/pages/zip";
import Setting from "@/pages/setting";
import Home from "@/pages/home";
import Decompression from "@/pages/decompression";
import Compression from "@/pages/compression";

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
                path: "home",
                element: <Home/>,
            },
            {
                path: "decompression",
                element: <Decompression/>,
            },
            {
                path: "compression",
                element: <Compression/>,
            },
            {
                path: "settings",
                element: <Setting/>,
            },
        ],
    },
]);

export default router;