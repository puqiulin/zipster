import React, {memo, useEffect, useState} from "react";
import {
    CircularProgress,
    Divider, IconButton
} from "@mui/material";
import {useSetRecoilState} from "recoil";
import {compressionFilesInfoState, deCompressionFileInfoState} from "@/services/states";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import {covertFileSizeToHuman} from "@/utils/utils";
import fileInfo = CmdResponseType.fileInfo;
import {getDirSizeCMD} from "@/services/cmds";
import {enqueueSnackbar} from "notistack";
import "./index.scss"

interface Props {
    fileInfo: fileInfo
    isCompression: boolean
}

const FilesItem: React.FC<Props> = (props) => {
    const {fileInfo, isCompression} = props;
    const setCompressionFilesInfo = useSetRecoilState(compressionFilesInfoState)
    const setDeCompressionFilesInfo = useSetRecoilState(deCompressionFileInfoState)
    const [fileSizeLoading, setFileSizeLoading] = useState<boolean>(false)
    const [fileSize, setFileSize] = useState<number>()

    useEffect(() => {
        if (fileInfo?.isDir) {
            setFileSizeLoading(true)
            getDirSizeCMD({dirPath: fileInfo?.path}).then(size => {
                setFileSize(size)
            }).catch(e => {
                enqueueSnackbar("Get dir size error: " + JSON.stringify(e), {
                    variant: "error",
                })
            }).finally(() => {
                setFileSizeLoading(false)
            })
        } else {
            setFileSize(fileInfo?.size || 0)
        }
    }, [fileInfo.size])

    const removeFileItem = () => {
        isCompression ? setCompressionFilesInfo(filesInfo => filesInfo.filter(f => f.path !== fileInfo.path)) : setDeCompressionFilesInfo(undefined)
    }

    return (
        <div className="files-item">
            <div className="files-item-info-box">
                <IconButton disabled={fileSizeLoading} onClick={() => removeFileItem()}>
                    <RemoveCircleOutlineIcon sx={{fontSize: "30px"}} className="MuiSvgIcon-colorCustom"/>
                </IconButton>
                <div className="files-item-info">
                    <div className="files-item-info-head">
                        <div>
                            {fileInfo.isDir ? <FolderIcon/> : <DescriptionIcon/>}
                        </div>
                        <div className="files-item-info-name">{fileInfo.name}</div>
                        <div className="files-item-info-size">
                            {fileSizeLoading ? <CircularProgress size={20}/> : covertFileSizeToHuman(fileSize || 0)}
                        </div>
                    </div>
                    <div className="file-path">{fileInfo.path}</div>
                </div>
            </div>
            <Divider/>
        </div>
    );
}

export default memo(FilesItem);