import React, {useState} from "react";
import "./index.scss"
import Typography from '@mui/material/Typography';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
} from "@mui/material";
import {open} from '@tauri-apps/api/dialog';
import {enqueueSnackbar} from "notistack";
import FolderIcon from '@mui/icons-material/Folder';
import {decompressionCMD, getFileInfoCMD, openCMD} from "@/services/cmds";
import {getParentDirectory} from "@/utils/utils";
import FilesItem from "@/components/compression/files-item";

const Decompression: React.FC = () => {

    const [decompressionFile, setDecompressionFile] = useState<string>("")
    const [fileInfo, setFileInfo] = useState<CmdResponseType.fileInfo>()
    const [openFileExploreLoading, setOpenFileExploreLoading] = useState<boolean>(false)
    const [decompressionFileLoading, setDecompressionFileLoading] = useState<boolean>(false)

    const openFileExplorer = async () => {
        setOpenFileExploreLoading(true)
        open({
            multiple: false, //support multiple files?
            filters: [{
                name: 'decompressionFile',
                extensions: ['zip', 'gz', 'bz2', '7z', 'rar', 'tar', 'jar']
            }]
        }).then(async file => {
            setDecompressionFile(file as string)
            getFileInfoCMD({filePath: file as string}).then(file => {
                setFileInfo(file)
            })
        }).catch(e => {
            enqueueSnackbar("open file error: " + JSON.stringify(e), {
                variant: "error",
            })
        }).finally(() => {
            setOpenFileExploreLoading(false)
        })
    }

    const decompression = async () => {
        setDecompressionFileLoading(true)
        if (decompressionFile) {
            decompressionCMD({filePath: decompressionFile}).then(async () => {
                enqueueSnackbar("decompression file successfully! ", {
                    variant: "success",
                })
                await openCMD({path: getParentDirectory(decompressionFile)})
            }).catch(e => {
                enqueueSnackbar("decompression file error: " + JSON.stringify(e), {
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
                    <CardContent>
                        <div className="decompression-top-box">
                            {/*<Typography variant="h6" align="justify">File Decompression</Typography>*/}
                            <Button
                                onClick={() => openFileExplorer()}
                                variant="contained"
                                disabled={openFileExploreLoading}
                                startIcon={openFileExploreLoading ? <CircularProgress size={20}/> :
                                    <FolderIcon className="MuiSvgIcon-colorCustom"/>}>
                                Select file
                            </Button>
                        </div>
                        {decompressionFile &&
                            <div className="decompression-bottom-box">
                                <div className="decompression-file-info">
                                    <FilesItem fileInfo={fileInfo} isCompression={false}/>
                                </div>
                                {decompressionFile ?
                                    <div className="decompression-bottom-buttons">
                                        <Button
                                            onClick={() => decompression()}
                                            variant="contained"
                                            startIcon={decompressionFileLoading ? <CircularProgress size={20}/> :
                                                <DriveFileMoveIcon className="MuiSvgIcon-colorCustom"/>}
                                        >
                                            Decompression file
                                        </Button>
                                    </div> : ""
                                }
                            </div>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Decompression;
