import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string
        }
        typography: Typography
        avatarStyles: AvatarStyles
    }
    interface ThemeOptions {
        status?: {
            danger?: string
        }
    }
    interface Palette {
        mode?: string
        common: {
            black?: string
        }
        primary: {
            light?: string
            main?: string
            dark?: string
            200?: string
            800?: string
        }
        secondary: {
            light?: string
            main?: string
            dark?: string
            200?: string
            800?: string
        }
        error: {
            light?: string
            main?: string
            dark?: string
        }
        orange: {
            light?: string
            main?: string
            dark?: string
        }
        warning: {
            light?: string
            main?: string
            dark?: string
        }
        success: {
            light?: string
            main?: string
            dark?: string
            200?: string
        }
        grey: {
            50?: string
            100?: string
            500?: string
            600?: string
            700?: string
            900?: string
        }
        dark: {
            light?: string
            main?: string
            dark?: string
            800?: string
            900?: string
        }
        text: {
            primary?: string
            secondary?: string
            dark?: string
            hint?: string
        }
        background: {
            paper?: string
            default?: string
        }
    }
    interface AvatarStyles {
        commonAvatar: {
            cursor: string
            borderRadius: string
        }
        smallAvatar: {
            width: string
            height: string
            fontSize: string
        }
        mediumAvatar: {
            width: string
            height: string
            fontSize: string
        }
        largeAvatar: {
            width: string
            height: string
            fontSize: string
        } // Move largeAvatar property to AvatarStyles interface
    }

    interface Typography {
        fontFamily?: string
        h6: TypographyStyle
        h5: TypographyStyle
        h4: TypographyStyle
        h3: TypographyStyle
        h2: TypographyStyle
        h1: TypographyStyle
        subtitle1: TypographyStyle
        subtitle2: TypographyStyle
        caption: TypographyStyle
        body1: TypographyStyle
        body2: TypographyStyle
        button: {
            textTransform: string
        }
        customInput: {
            marginTop: number
            marginBottom: number
            '& > label': {
                top: number
                left: number
                color: string
                '&[data-shrink="false"]': {
                    top: number
                }
            }
            '& > div > input': {
                padding: string
            }
            '& legend': {
                display: string
            }
            '& fieldset': {
                top: number
            }
        }
        mainContent: {
            backgroundColor: string
            width: string
            minHeight: string
            flexGrow: number
            padding: string
            marginTop: string
            marginRight: string
            borderRadius: string
        }
        menuCaption: {
            fontSize: string
            fontWeight: number
            color: string
            padding: string
            textTransform: string
            marginTop: string
        }
        subMenuCaption: {
            fontSize: string
            fontWeight: number
            color: string
            textTransform: string
        }
        commonAvatar: {
            cursor: string
            borderRadius: string
        }
        smallAvatar: {
            width: string
            height: string
            fontSize: string
        }
        mediumAvatar: {
            width: string
            height: string
            fontSize: string
        }
        largeAvatar: {
            width: string
            height: string
            fontSize: string
        } // Add largeAvatar property
    }
}

declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames
    export = classNames
}
declare global {
    interface IconMapping {
        [key: string]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
            muiName: string
        }
    }
    type CustomTheme = {
        isOpen: string[]
        defaultId: string
        fontFamily: string
        borderRadius: number
        opened: boolean
        theme: string
    }

    interface Theme {
        colors: {
            paper: string
            textDark: string
            primaryLight: string
            primary200: string
            primaryMain: string
            primaryDark: string
            primary800: string
            secondaryLight: string
            secondary200: string
            secondaryMain: string
            secondaryDark: string
            secondary800: string
            successLight: string
            success200: string
            successMain: string
            successDark: string
            errorLight: string
            errorMain: string
            errorDark: string
            orangeLight: string
            orangeMain: string
            orangeDark: string
            warningLight: string
            warningMain: string
            warningDark: string
            grey50: string
            grey100: string
            grey200: string
            grey300: string
            grey400: string
            grey500: string
            grey600: string
            grey700: string
            grey900: string
            darkPaper: string
            darkBackground: string
            darkLevel1: string
            darkLevel2: string
            darkTextTitle: string
            darkTextPrimary: string
            darkTextSecondary: string
            darkPrimaryLight: string
            darkPrimaryMain: string
            darkPrimaryDark: string
            darkPrimary200: string
            darkPrimary800: string
            darkSecondaryLight: string
            darkSecondaryMain: string
            darkSecondaryDark: string
            darkSecondary200: string
            darkSecondary800: string
        }
        heading: string
        paper: string
        backgroundDefault: string
        background: string
        darkTextPrimary: string
        darkTextSecondary: string
        textDark: string
        menuSelected: string
        menuSelectedBack: string
        divider: string
        customization: CustomTheme
    }
}
