import { useState } from 'react'
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import { useDispatch, useSelector } from 'react-redux'
import { SET_THEME } from '../../../../redux/actions'
import React from 'react'

const IOSSwitch = styled(Switch)(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 30,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(5px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' && theme.palette.secondary.dark,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#000'
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
        borderRadius: 12,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#c97534'
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#5e35b1' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}))

const ThemeSection = () => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const customization = useSelector((state: ReduxState) => state.customization)

    const [themeMode, setThemeMode] = useState(customization.theme)

    const handleTheme = () => {
        const newThemeMode = themeMode === 'light' ? 'dark' : 'light'
        setThemeMode(newThemeMode)
        dispatch({ type: SET_THEME, theme: newThemeMode })
    }

    return (
        <Box
            sx={{
                ml: 2,
                mr: 3,
                [theme.breakpoints.down('md')]: {
                    mr: 2,
                },
            }}
        >
            <IOSSwitch checked={themeMode === 'dark'} onChange={handleTheme} sx={{ m: 1 }} />
        </Box>
    )
}

export default ThemeSection
