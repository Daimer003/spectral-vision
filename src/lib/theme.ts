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
                display: "none", // Ocultar scrollbar en navegadores basados en WebKit
                width: "0px",
                background: "transparent",  // Hides scrollbar for WebKit browsers
            },
            "::-webkit-scrollbar-thumb": {
                background: "transparent",
            },
            "*": {
                scrollbarWidth: "none",  // Hides scrollbar for Firefox
                msOverflowStyle: "none", // Hides scrollbar for Internet Explorer and Edge
            },
            "#__next": {
                height: "100%", // Asegura que el contenedor de Next.js ocupe toda la altura
                overflowY: "scroll", // Permitir scroll dentro de la aplicación
                '-webkit-overflow-scrolling': 'touch', // Suaviza el desplazamiento en dispositivos táctiles
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
                            transform: "scale(0.85) translateY(-45px)", // Mantener la etiqueta flotando en enfoque
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
            buttonSecondary: () => ({
                bg: 'linear-gradient(90deg, #842EF5 0%, #F6C8FF 100%)',
                color: '#ffffff',
                fontSize: '14px',
                borderRadius: '50px',
                position: 'relative',
                transition: '.3s ease-in-out',
               // border: '1px solid gray',
                zIndex: 0,
                _hover: {},
            }),

            button: () => ({
                bg: '#01DBE7',
                color: '#ffffff',
                fontSize: '14px',
                borderRadius: '50px',
                position: 'relative',
                transition: '.3s ease-in-out',
               // border: '1px solid gray',
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