import React, {useState} from "react";
import "./index.scss"
import Typography from '@mui/material/Typography';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import {
    Button,
    Card,
    CardContent,
    CircularProgress, Divider, MenuItem, Select,
} from "@mui/material";
import {open} from '@tauri-apps/api/dialog';
import {enqueueSnackbar} from "notistack";
import FolderIcon from '@mui/icons-material/Folder';
import {compressionCMD, getFilesInfoCMD} from "@/services/cmds";
import {formatBytes} from "@/utils/format-bytes";
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FolderZipIcon from '@mui/icons-material/FolderZip';

const Compression: React.FC = () => {
    const [compressionFiles, setCompressionFiles] = useState<string[]>()
    const [filesInfo, setFilesInfo] = useState<CmdResponseType.fileInfo[]>()
    const [openFilesExploreLoading, setOpenFilesExploreLoading] = useState<boolean>(false)
    const [compressionFilesLoading, setCompressionFilesLoading] = useState<boolean>(false)
    const [compressionType, setCompressionType] = useState<string>("zip")

    const openFilesExplorer = async () => {
        setOpenFilesExploreLoading(true)
        open({
            multiple: true,
        }).then(async files => {
            setCompressionFiles(files as string[])
            getFilesInfoCMD({filesPath: files as string[]}).then(files => {
                setFilesInfo(files)
            })
        }).catch(e => {
            enqueueSnackbar("open file error: " + JSON.stringify(e), {
                variant: "error",
            })
        }).finally(() => {
            setOpenFilesExploreLoading(false)
        })
    }

    const compression = async () => {
        setCompressionFilesLoading(true)
        compressionCMD({filesPath: compressionFiles || []}).then(async () => {
            enqueueSnackbar("compression file successfully! ", {
                variant: "success",
            })
            // await openCMD({path: compressionFiles})
        }).catch(e => {
            enqueueSnackbar("compression file error: " + JSON.stringify(e), {
                variant: "error",
            })
        }).finally(() => {
            setCompressionFilesLoading(false)
        })
    }

    return (
        <div className="compression-box">
            <div className="compression-title">
                <Typography sx={{fontWeight: "bold"}} variant="h5">Compression Files</Typography>
            </div>
            <div className="compression-content">
                <Card className="compression-card">
                    <CardContent>
                        <div className="compression-top-box">
                            {/*<Typography variant="h6" align="justify">Compression files</Typography>*/}
                            <Button
                                onClick={() => openFilesExplorer()}
                                variant="contained"
                                disabled={openFilesExploreLoading}
                                startIcon={openFilesExploreLoading ? <CircularProgress size={20}/> :
                                    <FolderCopyIcon className="MuiSvgIcon-colorCustom"/>}>
                                Select files
                            </Button>
                        </div>
                        <div className="compression-bottom-box">
                            {compressionFiles && <div className="compression-file-info">
                                {filesInfo?.map((fileInfo, index) => (
                                    <div className="files-item">
                                        <div className="files-item-info">
                                            {index + 1}:&nbsp;
                                            {fileInfo?.fileName}
                                            &nbsp;
                                            [{fileInfo?.fileSize && formatBytes(fileInfo.fileSize)}]
                                        </div>
                                        <Divider/>
                                    </div>
                                ))}
                            </div>}
                            {compressionFiles ?
                                compressionFilesLoading ?
                                    <CircularProgress size={20}/> :
                                    <div className="compression-bottom-buttons">
                                        <Button
                                            className="compression-button"
                                            onClick={() => compression()}
                                            variant="contained"
                                            startIcon={<FolderZipIcon className="MuiSvgIcon-colorCustom"/>}
                                        >
                                            Compression files
                                        </Button>

                                        <Select
                                            size="small"
                                            defaultValue={compressionType}
                                            value={compressionType}
                                            onChange={e => e.target.value ? setCompressionType(e.target.value) : setCompressionType("zip")}
                                        >
                                            <MenuItem value="zip">zip</MenuItem>
                                            <MenuItem value="tar">tar</MenuItem>
                                            <MenuItem value="gz">gz</MenuItem>
                                            <MenuItem value="bz2">bz2</MenuItem>
                                            <MenuItem value="7z">7z</MenuItem>
                                            <MenuItem value="rar">rar</MenuItem>
                                        </Select>
                                    </div>
                                : ""
                            }
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Compression;
