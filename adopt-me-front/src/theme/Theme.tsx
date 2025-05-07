import {createTheme} from "@mui/material";
import {blue, deepPurple, green, grey, red} from "@mui/material/colors";

declare module "@mui/material/styles" {
    interface Palette {
        menuIcon: {
            background: string
            backgroundHover: string
            icon: string
            iconHover: string
        },
        colorModeIcon: {
            background: string
            backgroundHover: string
            icon: string
            iconHover: string
        },
        languageIcon: {
            background: string
            backgroundHover: string
            icon: string
            iconHover: string
        },
        chipMenu: {
            background: string
            backgroundHover: string
            settingsIcon: string
            settingsIconHover: string
            settingsIconStroke: string
            settingsIconStrokeHover: string
        },
        chipAvatar: {
            background: string
        },
        pointer: string,
        drawer: {
            default: {
                background: string
                text: string
            },
            selected: {
                background: string
                text: string
            },
            hover: {
                background: string
                text: string
            }
        },
        paper: {
            main: string
            secondary: string
            third: string
            fourth: string
        },
        button: {
            main: string
        },
        table: {
            background: string
            divider: string
            text: string
            titleText: string
            filterIcon: string
            rowHover: string
            simpleTable: {
                background: string,
                divider: string
                text: string
            }
        },
        textField: {
            text: string
            background: string
        },
        user: {
            create: {
                userCreateBox: {
                    color: string
                    borderColor: string
                },
                userCreateHeader: {
                    color: string
                },
                userCreateContent: {
                    borderColor: string
                }
            }
        },
        authForm: {
            textField: {
                color: string
                border: string
                backgroundColor: string
                hoverColor: string
                hoverBorderColor: string
            },
            fileInput: {
                color: string
                border: string
                backgroundColor: string
                hoverBorderColor: string
            },
            select: {
                border: string
            }
        },
        topRightElement: {
            background: string
        },
        createAnimal: {
            panel: {
                border: string
                background: string
            },
            button: {
                background: string
                border: string
            }
        },
        createArticle: {
            panel: {
                border: string
                background: string
            },
            button: {
                background: string
                border: string
            }
        }
    }

    interface PaletteOptions {
        menuIcon: {
            background: string
            backgroundHover: string
            icon: string
            iconHover: string
        },
        colorModeIcon: {
            background: string
            backgroundHover: string
            icon: string
            iconHover: string
        },
        languageIcon: {
            background: string
            backgroundHover: string
            icon: string
            iconHover: string
        },
        chipMenu: {
            background: string
            backgroundHover: string
            settingsIcon: string
            settingsIconHover: string
            settingsIconStroke: string
            settingsIconStrokeHover: string
        },
        chipAvatar: {
            background: string
        },
        pointer: string,
        drawer: {
            default: {
                background: string
                text: string
            },
            selected: {
                background: string
                text: string
            },
            hover: {
                background: string
                text: string
            }
        },
        paper: {
            main: string
            secondary: string
            third: string
            fourth: string
        },
        button: {
            main: string
        },
        table: {
            background: string
            divider: string
            titleText: string
            text: string
            filterIcon: string
            rowHover: string
            simpleTable: {
                background: string,
                divider: string
                text: string
            }
        },
        textField: {
            text: string
            background: string
        },
        user: {
            create: {
                userCreateBox: {
                    color: string
                    borderColor: string
                },
                userCreateHeader: {
                    color: string
                },
                userCreateContent: {
                    borderColor: string
                }
            }
        },
        authForm: {
            textField: {
                color: string
                border: string
                backgroundColor: string
                hoverColor: string
                hoverBorderColor: string
            },
            fileInput: {
                color: string
                border: string
                backgroundColor: string
                hoverBorderColor: string
            },
            select: {
                border: string
            }
        },
        topRightElement: {
            background: string
        },
        createAnimal: {
            panel: {
                border: string
                background: string
            },
            button: {
                background: string
                border: string
            }
        }
        createArticle:{
            panel: {
                border: string
                background: string
            },
            button: {
                background: string
                border: string
            }

        }
    }
}

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: blue[500]
        },
        secondary: {
            main: deepPurple[500],
            light: 'rgb(237, 231, 246)',
            dark: 'rgb(237, 231, 246)'
        },
        info: {
            main: "rgb(33, 150, 243)"
        },
        text: {
            primary: "rgb(54, 65, 82)"
        },
        success: {
            main: green["A400"]
        },
        error: {
            main: red[600]
        },
        background: {
            default: '#fff',
            paper: '#fff'
        },
        divider: 'rgb(227, 232, 239)',
        menuIcon: {
            background: 'rgb(237, 231, 246)',
            backgroundHover: 'rgb(124, 77, 255)',
            iconHover: 'rgb(183, 164, 221)',
            icon: 'rgb(148, 120, 204)'
        },
        colorModeIcon: {
            background: 'rgb(237, 231, 246)',
            backgroundHover: 'rgb(124, 77, 255)',
            iconHover: 'rgb(183, 164, 221)',
            icon: 'rgb(148, 120, 204)'
        },
        languageIcon: {
            background: 'rgb(224, 241, 253)',
            backgroundHover: 'rgb(33, 150, 243)',
            iconHover: 'rgb(255,255,255)',
            icon: 'rgb(33, 150, 243)',
        },
        chipMenu: {
            background: 'rgb(224, 241, 253)',
            backgroundHover: 'rgb(33, 150, 243)',
            settingsIcon: 'rgb(224, 241, 253)',
            settingsIconHover: 'rgb(33, 150, 243)',
            settingsIconStroke: 'rgb(33, 150, 243)',
            settingsIconStrokeHover: 'rgb(255,255,255)',
        },
        chipAvatar: {
            background: 'rgb(224, 241, 253)'
        },
        drawer: {
            default: {
                text: '',
                background: ''
            },
            selected: {
                text: '',
                background: ''
            },
            hover: {
                text: '',
                background: ''
            }
        },
        pointer: "rgb(54, 65, 82)",
        paper: {
            main: '#eef2f6',
            secondary: 'rgb(255, 255, 255)',
            third: 'rgb(255, 255, 255)',
            fourth: ''
        },
        button: {
            main: 'rgb(33, 150, 243)'
        },
        table: {
            background: 'rgb(255, 255, 255)',
            divider: 'rgb(224, 224, 224)',
            titleText: 'rgb(54, 65, 82)',
            text: 'rgb(18, 25, 38)',
            filterIcon: grey['600'],
            rowHover: 'rgb(245, 245, 245)',
            simpleTable: {
                background: 'rgb(255, 255, 255)',
                divider: 'rgb(224, 224, 224)',
                text: 'rgb(18, 25, 38)'
            }
        },
        textField: {
            text: 'red',
            background: ''
        },
        user: {
            create: {
                userCreateBox: {
                    color: 'rgb(54, 65, 82)',
                    borderColor: 'rgb(238, 238, 238)'
                },
                userCreateHeader: {
                    color: 'rgb(18, 25, 38)'
                },
                userCreateContent: {
                    borderColor: 'rgb(238, 238, 238)'
                }
            }
        },
        authForm: {
            textField: {
                color: '#474c57',
                border: 'rgba(189,189,189,255)',
                backgroundColor: '#F8FAFC',
                hoverColor: '#F8FAFC',
                hoverBorderColor: 'black'
            },
            fileInput: {
                color: '#66686d',
                border: 'rgba(189,189,189,255)',
                backgroundColor: '#F8FAFC',
                hoverBorderColor: 'rgb(0, 0, 0)'
            },
            select: {
                border: 'none'
            }
        },
        topRightElement: {
            background: 'rgb(227, 242, 253)'
        },

        createAnimal: {
            panel: {
                border: 'rgb(238, 238, 238)',
                background: 'rgb(255, 255, 255)'
            },
            button: {
                background: 'F8FAFC',
                border: 'rgba(189,189,189,255)'
            }
        },
        createArticle: {
            panel: {
                border: 'rgb(238, 238, 238)',
                background: 'rgb(255, 255, 255)'
            },
            button: {
                background: 'F8FAFC',
                border: 'rgba(189,189,189,255)'
            }
        },
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                adornedEnd: {
                    backgroundColor: "#F8FAFC",
                },
            },
        },
    }
})

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: blue[500]
        },
        secondary: {
            main: 'rgb(92, 66, 189)',
            light: 'rgb(178, 151, 242)',
            dark: 'rgb(41, 49, 79)'
        },
        info: {
            main: "rgb(33, 150, 243)"
        },
        text: {
            primary: blue[50],
            secondary: 'rgb(189, 200, 240)'
        },
        success: {
            main: green["A400"]
        },
        error: {
            main: red[800]
        },
        background: {
            default: 'rgb(17, 25, 54)',
            paper: '#fff',
        },
        divider: 'rgb(64, 73, 104)',
        menuIcon: {
            background: 'rgb(41, 49, 79)',
            backgroundHover: 'rgb(124, 77, 255)',
            iconHover: 'rgb(178, 151, 242)',
            icon: 'rgb(92, 66, 189)'
        },
        colorModeIcon: {
            background: 'rgb(41, 49, 79)',
            backgroundHover: 'rgb(124, 77, 255)',
            iconHover: 'rgb(178, 151, 242)',
            icon: 'rgb(92, 66, 189)'
        },
        languageIcon: {
            background: 'rgb(41, 49, 79)',
            backgroundHover: 'rgb(33, 150, 243)',
            iconHover: 'rgb(255,255,255)',
            icon: 'rgb(33, 150, 243)',
        },
        chipMenu: {
            background: 'rgb(41, 49, 79)',
            backgroundHover: 'rgb(33, 150, 243)',
            settingsIcon: 'rgb(41, 49, 79)',
            settingsIconHover: 'rgb(33, 150, 243)',
            settingsIconStroke: 'rgb(33, 150, 243)',
            settingsIconStrokeHover: 'rgb(255,255,255)',
        },
        chipAvatar: {
            background: 'rgba(41,49,79)'
        },
        pointer: 'rgb(189, 200, 240)',
        drawer: {
            default: {
                text: '',
                background: ''
            },
            selected: {
                text: 'rgb(124, 77, 255)',
                background: 'rgb(21, 60, 107)'
            },
            hover: {
                text: 'rgb(124, 77, 255)',
                background: 'rgb(26, 29, 71)'
            }
        },
        paper: {
            main: 'rgb(26, 34, 63)',
            secondary: 'rgb(33, 41, 70)',
            third: 'rgb(1, 14, 43)',
            fourth: 'rgb(41,49,86)',
        },
        button: {
            main: 'rgb(33, 150, 243)'
        },
        table: {
            background: 'rgb(33, 41, 70)',
            divider: 'rgb(64, 73, 104)',
            titleText: 'rgb(54, 65, 82)',
            text: 'rgb(215, 220, 236)',
            filterIcon: 'rgb(255, 255, 255)',
            rowHover: 'rgb(50, 58, 85)',
            simpleTable: {
                background: 'rgb(40,49,82)',
                divider: 'rgb(64, 73, 104)',
                text: 'rgb(215, 220, 236)',
            }
        },
        textField: {
            text: '',
            background: 'rgb(17, 25, 54)'
        },
        user: {
            create: {
                userCreateBox: {
                    color: 'rgb(189, 200, 240)',
                    borderColor: 'rgb(60,63,86)',
                },
                userCreateHeader: {
                    color: 'rgb(189, 200, 240)',
                },
                userCreateContent: {
                    borderColor: 'rgb(60,63,86)',
                }
            }
        },
        authForm: {
            textField: {
                color: 'rgb(215, 220, 236)',
                border: 'rgb(73,76,103)',
                backgroundColor: 'inherit',
                hoverColor: 'rgb(17, 25, 54)',
                hoverBorderColor: 'rgb(133,137,180)',
            },
            fileInput: {
                color: 'rgb(215, 220, 236)',
                border: 'rgb(73,76,103)',
                backgroundColor: 'inherit',
                hoverBorderColor: 'rgb(54,17,17)',
            },
            select: {
                border: 'rgb(73,76,103)'
            }
        },
        topRightElement: {
            background: 'rgb(33, 41, 70)'
        },
        createAnimal: {
            panel: {
                border: 'rgb(60,63,86)',
                background: 'rgb(26, 34, 63)'
            },
            button: {
                background: 'rgb(26, 34, 63)',
                border: 'rgb(60,63,86)'
            }
        },
        createArticle: {
            panel: {
                border: 'rgb(60,63,86)',
                background: 'rgb(26, 34, 63)'
            },
            button: {
                background: 'rgb(26, 34, 63)',
                border: 'rgb(60,63,86)'
            }
        },
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                adornedEnd: {
                    backgroundColor: "#F8FAFC",
                },
            },
        },
    }
})
