import {createTheme} from "@mui/material";

export const darkTheme = createTheme({
    palette: {
        background: {
            default: "#000000",
            paper: "#000000",
        },
        mode: 'dark',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#111111',
                    '&:hover': {
                        backgroundColor: '#222222',
                        boxShadow: "-1px 5px 20px 0px rgba(255, 255, 255, 0.5)"
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    '&.MuiSvgIcon-colorCustom': {
                        color: '#ffffff',
                    },
                },
            },
        },
    }
});

export const lightTheme = createTheme({
    palette: {
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
        mode: 'light',
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f5f5f5',
                    boxShadow: "0 2px 8px 0px rgba(0, 0, 0, 0.5)",
                    '&:hover': {
                        backgroundColor: '#e0e0e0',
                        boxShadow: "-1px 5px 20px 0px rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    '&.MuiSvgIcon-colorCustom': {
                        color: '#000000',
                    },
                },
            },
        },
    }
});