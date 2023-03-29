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
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "20px"
                },
                rounded: {
                    borderRadius: '16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: "0 0 5px rgba(255, 255, 255, 0.5)",
                    backgroundColor: '#111111',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "20px"
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
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    borderRadius: "20px"
                }
            }
        }
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
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "20px"
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f5f5f5',
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "20px"
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