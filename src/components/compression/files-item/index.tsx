import React, {useEffect, useState} from "react";
import {
    CircularProgress,
    Divider, IconButton
} from "@mui/material";
import {useRecoilState} from "recoil";
import {compressionFilesState} from "@/services/states";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import {covertFileSizeToHuman} from "@/utils/utils";
import fileInfo = CmdResponseType.fileInfo;
import {getDirSizeCMD} from "@/services/cmds";
import {enqueueSnackbar} from "notistack";

interface Props {
    fileInfo: fileInfo
}

const FilesItem: React.FC<Props> = (props) => {
    const {fileInfo} = props;
    const [compressionFiles, setCompressionFiles] = useRecoilState(compressionFilesState)
    const [fileSizeLoading, setFileSizeLoading] = useState<boolean>(false)
    const [fileSize, setFileSize] = useState<number>(0)

    useEffect(() => {
        if (fileInfo.isDir) {
            setFileSizeLoading(true)
            getDirSizeCMD({dirPath: fileInfo.path}).then(size => setFileSize(size)).catch(e => {
                enqueueSnackbar("Get size error: " + JSON.stringify(e), {
                    variant: "error",
                })
            }).finally(() => {
                setFileSizeLoading(false)
            })
        } else {
            setFileSize(fileInfo.size)
        }
    }, [fileInfo.size])

    const removeFileItem = () => {
        setCompressionFiles(compressionFiles.filter(f => f !== fileInfo.path))
    }

    return (
        <div className="files-item">
            <div className="files-item-info-box">
                <IconButton onClick={() => removeFileItem()}>
                    <RemoveCircleOutlineIcon sx={{fontSize: "30px"}} className="MuiSvgIcon-colorCustom"/>
                </IconButton>
                <div className="files-item-info">
                    <div className="files-item-info-head">
                        <div>
                            {fileInfo?.isDir ? <FolderIcon/> : <DescriptionIcon/>}
                        </div>
                        <div className="files-item-info-name">{fileInfo?.name}</div>
                        <div className="files-item-info-size">
                            {fileSizeLoading ? <CircularProgress size={20}/> : covertFileSizeToHuman(fileSize)}
                        </div>
                    </div>
                    <div>{fileInfo?.path}</div>
                </div>
            </div>
            <Divider/>
        </div>
    );
}

export default FilesItem;