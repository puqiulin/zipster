import React, {memo, useState} from "react";
import "./index.scss"
import Typography from '@mui/material/Typography';
import {
    Button,
    Card,
    CircularProgress, MenuItem, Select,
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
    compressionTypeState
} from "@/services/states";
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import FilesItem from "@/components/compression/files-item";
import {supportCompressionType} from "@/utils/constants";

const Compression: React.FC = () => {
    const [filesInfo, setFilesInfo] = useRecoilState(compressionFilesInfoState)
    const [openFilesExploreLoading, setOpenFilesExploreLoading] = useState<boolean>(false)
    const [compressionType, setCompressionType] = useRecoilState(compressionTypeState)
    const setOpen = useSetRecoilState(compressionConfirmDialogState)

    //tauri not support both select dirs and files until write this code
    //https://github.com/tauri-apps/tauri/discussions/5622
    const openFilesExplorer = (isDir: boolean) => {
        setOpenFilesExploreLoading(true)
        open({
            multiple: true,
            directory: isDir
        }).then(files => {
            if (files?.length || 0 > 0) {
                getFilesInfoCMD({filesPath: files as string[]}).then(newFilesInfo => {
                    // setFilesInfo(pre => [...new Set([...newFilesInfo, ...pre])])
                    setFilesInfo(pre => [...new Set([...pre, ...newFilesInfo])])
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
                    <div className="compression-top-box">
                        <Button
                            onClick={() => openFilesExplorer(false)}
                            variant="contained"
                            disabled={openFilesExploreLoading}
                            startIcon={openFilesExploreLoading ? <CircularProgress size={20}/> :
                                <DescriptionIcon className="MuiSvgIcon-colorCustom"/>}>
                            Select files
                        </Button>
                        <Button
                            onClick={() => openFilesExplorer(true)}
                            variant="contained"
                            disabled={openFilesExploreLoading}
                            startIcon={openFilesExploreLoading ? <CircularProgress size={20}/> :
                                <FolderIcon className="MuiSvgIcon-colorCustom"/>}>
                            Select dirs
                        </Button>
                    </div>
                    {/*{compressionFiles.length > 0 &&*/}
                    {filesInfo.length > 0 &&
                        <div className="compression-bottom-box">
                            <div className="compression-bottom-box-head">
                                <Typography sx={{fontWeight: "bold"}} variant="subtitle1">
                                    File count: {filesInfo.filter(f => !f.isDir).length}
                                </Typography>
                                <Typography sx={{fontWeight: "bold"}} variant="subtitle1">
                                    Dir count: {filesInfo.filter(f => f.isDir).length}
                                </Typography>
                            </div>
                            <div className="compression-file-info">
                                {filesInfo?.map((fileInfo, index) =>
                                    <FilesItem key={index.toString()} fileInfo={fileInfo} isCompression={true}/>
                                )}
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
                                {/*<NativeSelect>*/}
                                <Select
                                    className="compression-type-select"
                                    size="small"
                                    defaultValue={compressionType}
                                    value={compressionType}
                                    onChange={e => e.target.value ? setCompressionType(e.target.value) : setCompressionType("zip")}
                                >
                                    {supportCompressionType.map((value, index) => (
                                        <MenuItem value={value} key={index}>{value}</MenuItem>
                                        // <option key={index} value={value}>{value}</option>
                                    ))}
                                </Select>
                                {/*</NativeSelect>*/}
                            </div>
                        </div>
                    }
                </Card>
            </div>
        </div>
    )
}

export default memo(Compression);
