import { amber, deepPurple, green, indigo, purple, red, shades } from "vuetify/util/colors"

export const lightPurple = {
    dark: false,
    colors: {
        background: deepPurple.lighten5,
        surface: shades.white,
        "surface-bright": shades.white,
        "surface-variant": deepPurple.lighten4,

        primary: deepPurple.lighten1,
        "primary-darken-1": deepPurple.base,

        secondary: purple.lighten2,

        accent: deepPurple.lighten3,

        error: red.base,
        info: indigo.base,
        success: green.darken1,
        warning: amber.darken1,

        "text-primary": deepPurple.darken4,
        "text-secondary": deepPurple.darken1,
    },
}

export const darkPurple = {
    dark: true,
    colors: {
        background: deepPurple.darken4,
        surface: deepPurple.darken3,
        "surface-bright": deepPurple.darken2,
        "surface-variant": deepPurple.darken2,

        primary: deepPurple.lighten2,
        "primary-darken-1": deepPurple.lighten1,

        secondary: purple.lighten2,

        accent: deepPurple.lighten4,

        error: red.lighten2,
        info: indigo.lighten2,
        success: green.lighten1,
        warning: amber.lighten1,

        "text-primary": shades.white,
        "text-secondary": deepPurple.lighten3,
    },
}
