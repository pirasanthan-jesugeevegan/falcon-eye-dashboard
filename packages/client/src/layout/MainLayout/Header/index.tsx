import React from 'react'
import { Avatar, Box, ButtonBase, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { IconMenu2 } from '@tabler/icons'
import ThemeSection from './ThemeSection'
import LogoSection from '../LogoSection'

const Header = ({ handleLeftDrawerToggle }: any) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    return (
        <>
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto',
                    },
                }}
            >
                <Box
                    component="span"
                    sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
                >
                    <LogoSection />
                </Box>
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background:
                                theme.palette.mode === 'light'
                                    ? theme.palette.secondary.light
                                    : theme.palette.dark.main,
                            color:
                                theme.palette.mode === 'light'
                                    ? theme.palette.secondary.dark
                                    : '#7c4dff',
                            '&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light,
                            },
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
            </Box>
            <Box sx={{ flexGrow: 1, textAlignLast: 'center' }}>
                {isMobile && <LogoSection />}
            </Box>
            <ThemeSection />
        </>
    )
}

export default Header
