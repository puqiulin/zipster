import React from 'react'
import ReactDOM from 'react-dom/client'
import {RecoilRoot} from "recoil";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {SnackbarProvider} from 'notistack'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RecoilRoot>
            <SnackbarProvider/>
            <RouterProvider router={router}/>
        </RecoilRoot>
    </React.StrictMode>
)
