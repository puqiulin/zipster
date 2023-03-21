import React, {useEffect, useRef} from "react";
import "./index.scss"
import Typography from '@mui/material/Typography';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import {Card, CardActionArea, CardContent, styled, Switch, SwitchProps} from "@mui/material";
import {open} from '@tauri-apps/api/dialog';
import {enqueueSnackbar} from "notistack";

const Zip: React.FC = () => {
    //not working on tauri,should use file dialog,but start slow
    // const inputFile = useRef<HTMLInputElement | null>(null)
    // const openFileExplorer = async () => {
    //     inputFile.current?.click()
    // }

    const openFileExplorer = async () => {
        open({
            multiple: false, //support multiple files?
            filters: [{
                name: 'Image',
                extensions: ['zip', 'gz', 'bz2', '7z', 'rar', 'tar', 'jar']
            }]
        }).then(file => {
            enqueueSnackbar("open file: " + file, {
                variant: "success",
            })
        }).catch(e => {
            enqueueSnackbar("open file error: " + JSON.stringify(e), {
                variant: "error",
            })
        })
    }

    return (
        <div className="zip-box">
            <Card className="zip-card" onClick={() => openFileExplorer()}>
                <CardActionArea>
                    <CardContent>
                        <DriveFileMoveIcon color="primary" sx={{fontSize: 40}}/>
                        <Typography variant="h6">extract files</Typography>
                        {/*<input*/}
                        {/*    style={{display: "none"}}*/}
                        {/*    type="file"*/}
                        {/*    ref={inputFile}*/}
                        {/*    // accept=".zip, .gz, .bz2, .7z, .rar, .tar, .jar"/>*/}
                        {/*    accept="application/zip,.zip"/>*/}
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card className="zip-card">
                <CardActionArea>
                    <CardContent>
                        <FolderZipIcon color="primary" sx={{fontSize: 40}}/>
                        <Typography variant="h6">compressed files</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default Zip;