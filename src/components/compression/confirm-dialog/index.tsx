import React, {useState} from "react";
import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, Input, TextField
} from "@mui/material";
import {useRecoilState, useRecoilValue} from "recoil";
import {
    compressionConfirmDialogState,
    compressionFilesInfoState,
    compressionFilesState,
    compressionTypeState
} from "@/services/states";
import {compressionCMD, openCMD} from "@/services/cmds";
import {enqueueSnackbar} from "notistack";
import {getParentDirectory} from "@/utils/utils";
import FolderIcon from "@mui/icons-material/Folder";
import {open} from "@tauri-apps/api/dialog";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import {darkTheme} from "@/theme";

const ConfirmDialog: React.FC = () => {
    const [openDialog, setOpenDialog] = useRecoilState(compressionConfirmDialogState)
    const compressionFiles = useRecoilValue(compressionFilesState)
    const compressionType = useRecoilValue(compressionTypeState)
    const compressionFilesInfo = useRecoilValue(compressionFilesInfoState)
    const [compressionFilesLoading, setCompressionFilesLoading] = useState<boolean>(false)
    const [compressionName, setCompressionName] = useState<string>("compression")
    const [savePath, setSavePath] = useState<string>(getParentDirectory(compressionFilesInfo[0].path))
    const [openExplore, setOpenExplore] = useState<boolean>(false)

    const compression = async () => {
        setCompressionFilesLoading(true)
        compressionCMD({filesPath: compressionFiles || [], savePath}).then(async () => {
            enqueueSnackbar("compression file successfully! ", {
                variant: "success",
            })
            await openCMD({path: savePath})
        }).catch(e => {
            enqueueSnackbar("Compression file error: " + JSON.stringify(e), {
                variant: "error",
            })
        }).finally(() => {
            setCompressionFilesLoading(false)
        })
    }

    const chooseSaveDir = () => {
        setOpenExplore(true)
        open({
            directory: true,
        }).then(dir => {
            if (dir) {
                setSavePath(dir as string)
            }
        }).catch(e => {
            enqueueSnackbar("Open file explorer error: " + JSON.stringify(e), {
                variant: "error",
            })
        }).finally(() => {
            setOpenExplore(false)
        })
    }

    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(true)}
        >
            <DialogTitle>
                New compression file
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    fullWidth
                    disabled={compressionFilesLoading}
                    defaultValue={compressionName}
                    value={compressionName}
                    variant="standard"
                    label="File Name"
                    onChange={(e) => setCompressionName(e.target.value)}
                    InputProps={{
                        "endAdornment": `.${compressionType}`
                    }}
                />
                <TextField
                    margin="dense"
                    fullWidth
                    disabled={compressionFilesLoading}
                    defaultValue={savePath}
                    value={savePath}
                    variant="standard"
                    label="Save Path"
                    onChange={(e) => setSavePath(e.target.value)}
                    InputProps={{
                        "readOnly": true,
                        "endAdornment":
                            <IconButton disabled={openExplore} onClick={() => chooseSaveDir()}>
                                {openExplore ? <CircularProgress size={25}/> :
                                    <FolderIcon sx={{fontSize: "25px"}} className="MuiSvgIcon-colorCustom"/>}
                            </IconButton>
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => setOpenDialog(false)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={!compressionName || !savePath || compressionFilesLoading}
                    onClick={() => compression()}
                    startIcon={compressionFilesLoading && <CircularProgress size={25}/>}
                >
                    {!compressionFilesLoading && "Start"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;