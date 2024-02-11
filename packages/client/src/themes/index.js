/* eslint-disable import/order */
import { createTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'

// assets
import colors from '../assets/scss/_themes-vars.module.scss'

// project imports
import componentStyleOverrides from './compStyleOverride'
import themePalette from './palette'
import themeTypography from './typography'

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
    const color = colors
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const custom = useSelector((state) => state.customization)
    const theme = custom.theme

    const themeOption = {
        colors: color,
        heading: theme === 'light' ? color.grey900 : color.darkTextTitle,
        paper: theme === 'light' ? color.paper : color.darkPaper,
        backgroundDefault: theme === 'light' ? color.paper : color.darkPaper,
        background:
            theme === 'light' ? color.primaryLight : color.darkBackground,
        darkTextPrimary:
            theme === 'light' ? color.grey700 : color.darkTextPrimary,
        darkTextSecondary:
            theme === 'light' ? color.grey500 : color.darkTextSecondary,
        textDark: theme === 'light' ? color.grey900 : color.darkTextTitle,
        menuSelected:
            theme === 'light' ? color.secondaryDark : color.darkSecondaryMain,
        menuSelectedBack:
            theme === 'light' ? color.secondaryLight : '#7c4dff15',
        divider: theme === 'light' ? color.grey200 : color.grey600,
        customization,
    }

    const themeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px',
                },
            },
        },
        typography: themeTypography(themeOption),
    }

    const themes = createTheme(themeOptions)
    themes.components = componentStyleOverrides(themeOption)

    return themes
}

export default theme
