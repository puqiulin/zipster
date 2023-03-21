import React from 'react'
import ReactDOM from 'react-dom/client'
import {RecoilRoot} from "recoil";
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {SnackbarProvider} from 'notistack'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RecoilRoot>
            <SnackbarProvider
                autoHideDuration={2000}
                anchorOrigin={{horizontal: "center", vertical: "top"}}
                dense={true}
            />
            <RouterProvider router={router}/>
        </RecoilRoot>
    </React.StrictMode>
)
