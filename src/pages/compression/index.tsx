import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import "./index.scss"
import Typography from '@mui/material/Typography';
import {
    Button,
    Card,
    CardContent,
    CircularProgress, Divider, IconButton, MenuItem, Select,
} from "@mui/material";
import {open} from '@tauri-apps/api/dialog';
import {enqueueSnackbar} from "notistack";
import {getFilesInfoCMD} from "@/services/cmds";
import FolderZipIcon from '@mui/icons-material/FolderZip';
import ConfirmDialog from "@/components/compression/confirm-dialog";
import {useRecoilState, useSetRecoilState} from "recoil";
import {
    compressionConfirmDialogState,
    compressionFilesInfoState,
    compressionFilesState,
    compressionTypeState
} from "@/services/states";
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import FilesItem from "@/components/compression/files-item";
import fileInfo = CmdResponseType.fileInfo;
import {supportCompressionType} from "@/utils/constants";

const Compression: React.FC = () => {
    const [compressionFiles, setCompressionFiles] = useRecoilState(compressionFilesState)
    const [filesInfo, setFilesInfo] = useRecoilState(compressionFilesInfoState)
    const [openFilesExploreLoading, setOpenFilesExploreLoading] = useState<boolean>(false)
    const [compressionType, setCompressionType] = useRecoilState(compressionTypeState)
    const setOpen = useSetRecoilState(compressionConfirmDialogState)
    const inputFile = useRef<HTMLInputElement | null>(null)

    //TODO: Optimize performance
    useEffect(() => {
        if (compressionFiles.length > 0) {
            getFilesInfoCMD({filesPath: compressionFiles || []}).then(filesInfo => {
                setFilesInfo(filesInfo)
            })
        }
    }, [compressionFiles])

    //https://github.com/tauri-apps/tauri/discussions/5622
    const openFilesExplorer = () => {
        setOpenFilesExploreLoading(true)
        open({
            multiple: true,
        }).then(files => {
            if (files?.length || 0 > 0) {
                setCompressionFiles([...new Set([...files as string[], ...compressionFiles])])
            }
        }).catch(e => {
            enqueueSnackbar("Open file explorer error: " + JSON.stringify(e), {
                variant: "error",
            })
        }).finally(() => {
            setOpenFilesExploreLoading(false)
        })
    }

    const openDirsExplorer = () => {
        setOpenFilesExploreLoading(true)
        open({
            multiple: true,
            directory: true,
        }).then(files => {
            if (files?.length || 0 > 0) {
                setCompressionFiles([...new Set([...files as string[], ...compressionFiles])])
            }
        }).catch(e => {
            enqueueSnackbar("Open file explorer error: " + JSON.stringify(e), {
                variant: "error",
            })
        }).finally(() => {
            setOpenFilesExploreLoading(false)
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
                            <Button
                                onClick={() => openFilesExplorer()}
                                variant="contained"
                                disabled={openFilesExploreLoading}
                                startIcon={openFilesExploreLoading ? <CircularProgress size={20}/> :
                                    <DescriptionIcon className="MuiSvgIcon-colorCustom"/>}>
                                Select files
                            </Button>
                            <Button
                                onClick={() => openDirsExplorer()}
                                variant="contained"
                                disabled={openFilesExploreLoading}
                                startIcon={openFilesExploreLoading ? <CircularProgress size={20}/> :
                                    <FolderIcon className="MuiSvgIcon-colorCustom"/>}>
                                Select dirs
                            </Button>
                        </div>
                        {compressionFiles.length > 0 &&
                            <div className="compression-bottom-box">
                                <div className="compression-file-info">
                                    {filesInfo?.map((fileInfo, index) => (
                                        <FilesItem key={index} fileInfo={fileInfo}/>
                                    ))}
                                </div>
                                <div className="compression-bottom-buttons">
                                    <Button
                                        className="compression-button"
                                        onClick={() => setOpen(true)}
                                        variant="contained"
                                        startIcon={<FolderZipIcon className="MuiSvgIcon-colorCustom"/>}
                                    >
                                        Compression files
                                    </Button>
                                    <ConfirmDialog/>
                                    <Select
                                        size="small"
                                        defaultValue={compressionType}
                                        value={compressionType}
                                        onChange={e => e.target.value ? setCompressionType(e.target.value) : setCompressionType("zip")}
                                    >
                                        {supportCompressionType.map((value, index) => (
                                            <MenuItem value={value} key={index}>{value}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        }
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Compression;
