import React from "react";
import {Card, Divider, Paper, Typography} from "@mui/material";
import "./index.scss"
import ChangeTheme from "@/components/settings/change-theme";
import PinWindow from "@/components/settings/pin-window";

const Setting: React.FC = () => {
    return (
        <div className="settings-box">
            <div className="setting-title">
                <Typography sx={{fontWeight: "bold"}} variant="h5">Settings</Typography>
            </div>
            <Card className="system-settings">
                <div className="setting-item-title">
                    <Typography sx={{fontWeight: "bold"}} variant="h6">System settings</Typography>
                </div>
                <div className="setting-items">
                    <div className="setting-item">
                        <div className="setting-name">
                            <Typography variant="subtitle1">Theme</Typography>
                        </div>
                        <ChangeTheme/>
                    </div>
                    <Divider/>
                    <div className="setting-item">
                        <div className="setting-name">
                            <Typography variant="subtitle1">Pin window</Typography>
                        </div>
                        <PinWindow/>
                    </div>
                </div>
            </Card>

            <Card className="system-settings">
                <div className="setting-item-title">
                    <Typography sx={{fontWeight: "bold"}} variant="h6">Zip settings</Typography>
                </div>
                <div className="setting-items">
                    <div className="setting-item">
                        <div className="setting-name">
                            <Typography variant="subtitle1">xxx</Typography>
                        </div>
                    </div>
                </div>
            </Card>

        </div>
    );
}

export default Setting;