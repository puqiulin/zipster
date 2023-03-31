import React, {useEffect, useState} from "react";
import "./index.scss"
import Typography from '@mui/material/Typography';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import {
    Button,
    Card,
    CircularProgress,
} from "@mui/material";
import {open} from '@tauri-apps/api/dialog';
import {enqueueSnackbar} from "notistack";
import {decompressionCMD, getFileInfoCMD, openCMD} from "@/services/cmds";
import {getParentDirectory} from "@/utils/utils";
import FilesItem from "@/components/compression/files-item";
import {useRecoilState} from "recoil";
import {deCompressionFileInfoState} from "@/services/states";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import {supportCompressionType} from "@/utils/constants";

const Decompression: React.FC = () => {
    const [fileInfo, setFileInfo] = useRecoilState(deCompressionFileInfoState)
    const [openFileExploreLoading, setOpenFileExploreLoading] = useState<boolean>(false)
    const [decompressionFileLoading, setDecompressionFileLoading] = useState<boolean>(false)

    const openFileExplorer = async () => {
        setOpenFileExploreLoading(true)
        open({
            multiple: false,
            filters: [{
                name: 'decompressionFile',
                extensions: supportCompressionType
            }]
        }).then(async file => {
            if (file?.length || 0 > 0) {
                getFileInfoCMD({filePath: file as string}).then(file => {
                    setFileInfo(file)
                })
            } else {
                enqueueSnackbar("No file selected", {
                    variant: "warning",
                })
            }
        }).catch(e => {
            enqueueSnackbar("Open file explorer error: " + JSON.stringify(e), {
                variant: "error",
            })
        }).finally(() => {
            setOpenFileExploreLoading(false)
        })
    }

    const decompression = async () => {
        setDecompressionFileLoading(true)
        if (fileInfo) {
            decompressionCMD({filePath: fileInfo.path}).then(async () => {
                enqueueSnackbar("Decompression file successfully! ", {
                    variant: "success",
                })
                await openCMD({path: getParentDirectory(fileInfo.path)})
            }).catch(e => {
                enqueueSnackbar("Decompression file error: " + JSON.stringify(e), {
                    variant: "error",
                })
            }).finally(() => {
                setDecompressionFileLoading(false)
            })
        }
        return
    }

    return (
        <div className="decompression-box">
            <div className="decompression-title">
                <Typography sx={{fontWeight: "bold"}} variant="h5">Decompression File</Typography>
            </div>
            <div className="decompression-content">
                <Card className="decompression-card">
                    <div className="decompression-top-box">
                        <Button
                            onClick={() => openFileExplorer()}
                            variant="contained"
                            disabled={openFileExploreLoading}
                            startIcon={openFileExploreLoading ? <CircularProgress size={20}/> :
                                <FolderZipIcon className="MuiSvgIcon-colorCustom"/>}>
                            Select file
                        </Button>
                    </div>
                    {fileInfo &&
                        <div className="decompression-bottom-box">
                            <div className="decompression-file-info">
                                <FilesItem fileInfo={fileInfo} isCompression={false}/>
                            </div>
                            <div className="decompression-bottom-buttons">
                                <Button
                                    onClick={() => decompression()}
                                    variant="contained"
                                    startIcon={decompressionFileLoading ? <CircularProgress size={20}/> :
                                        <DriveFileMoveIcon className="MuiSvgIcon-colorCustom"/>}
                                >
                                    Decompression file
                                </Button>
                            </div>
                        </div>}
                </Card>
            </div>
        </div>
    );
}

export default Decompression;
