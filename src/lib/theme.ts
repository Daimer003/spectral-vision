'use client'

import {  extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

const activeLabelStyles = {
    transform: "scale(0.85) translateY(-36px)",
    backgroundColor: "transparent",
};

const styles = {
    global: () => ({
        body: {
            bg: '#000000',
            "html, body": {
                height: "100%",
                overflow: "hidden",
                // Estilos adicionales para dispositivos móviles
                touchAction: "none",
                overscrollBehavior: "none",
                WebkitOverflowScrolling: "touch",
            },
            "::-webkit-scrollbar": {
                display: "none", 
                width: "0px",
                background: "transparent", 
            },
            "::-webkit-scrollbar-thumb": {
                background: "transparent",
            },
            "*": {
                scrollbarWidth: "none", 
                msOverflowStyle: "none",
            },
            "#__next": {
                height: "100%", 
                overflowY: "scroll", 
                '-webkit-overflow-scrolling': 'touch',
            }
        }
    })
}

const components = {
    Form: {
        variants: {
            floating: {
                container: {
                    _focusWithin: {
                        label: {
                            ...activeLabelStyles,
                            transform: "scale(0.85) translateY(-45px)",
                        }
                    },
                    label: {
                        top: 0,
                        left: 0,
                        zIndex: 2,
                        position: "absolute",
                        backgroundColor: "transparent",
                        borderRadius: "6px",
                        color: '#4b4a49',
                        pointerEvents: "none",
                        mx: 3,
                        px: 1,
                        my: '11px',
                        transformOrigin: "left top"
                    }
                }
            }
        }
    },
    Button: {
        variants: {
            buttonPrimary: () => ({
                bg: '#2d94f2',
                color: '#ffffff',
                fontSize: '14px',
                borderRadius: '50px',
                position: 'relative',
                transition: '.3s ease-in-out',
                zIndex: 0,
                _hover: {},
            }),
        },

    },
    Heading: {
        variants: {
            'title': {
                fontSize: 38,
            }
        }
    },
    Link: {
        baseStyle: (props: any) => ({
            color: mode('#F0F0F2', '#0B0C0D')(props),
            textUnderlineOffset: 3
        })
    }
}

const fonts = {
    heading: "Montserrat, sans-serif"
}

const colors = {
    grassTeal: '#D0D9D6',
    greenDawn: {
        50: "#D0D9D6"
    },
    softPeach: "#F2CDAC",
    slateGray: "#4F5559",
    yellow900: {
        900: "#5F370E"
    }
}

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
}

const breakpoints = {
    base: '0em', // 0px
    sm: '30em', // ~480px
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '80em', // ~1280px
}

const theme = extendTheme({
    config,
    styles,
    components,
    fonts,
    colors,
    breakpoints
})

export default theme;