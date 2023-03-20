import React, {useEffect, useRef} from "react";
import "./index.scss"
import Typography from '@mui/material/Typography';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import {Card, CardActionArea, CardContent, styled, Switch, SwitchProps} from "@mui/material";

const Zip: React.FC = () => {
    const inputFile = useRef<HTMLInputElement | null>(null)

    return (
        <div className="zip-box">
            <Card className="zip-card" onClick={() => inputFile.current?.click()}>
                <CardActionArea>
                    <CardContent>
                        <DriveFileMoveIcon color="primary" sx={{fontSize: 40}}/>
                        <Typography variant="h5">UnZip File</Typography>
                        <input style={{display: "none"}} type="file" ref={inputFile}/>
                    </CardContent>
                </CardActionArea>
            </Card>

            <Card className="zip-card">
                <CardActionArea>
                    <CardContent>
                        <FolderZipIcon color="primary" sx={{fontSize: 40}}/>
                        <Typography variant="h5">Zip File</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    );
}

export default Zip;