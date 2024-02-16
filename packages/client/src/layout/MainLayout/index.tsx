import React from 'react'
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { IconChevronRight } from '@tabler/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

import Breadcrumbs from '../../components/extended/Breadcrumbs'
import navigation from '../../menu-items'

import Header from './Header'
import Sidebar from './Sidebar'

import { SET_MENU } from '../../redux/actions'
import { drawerWidth } from '../../redux/constants'

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: any; open: boolean }) => ({
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create(
        'margin',
        open
            ? {
                  easing: theme.transitions.easing.easeOut,
                  duration: theme.transitions.duration.enteringScreen,
              }
            : {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
              }
    ),
    [theme.breakpoints.up('md')]: {
        marginLeft: open ? 0 : -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('md')]: {
        marginLeft: '20px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
        marginLeft: '10px',
        width: `calc(100% - ${drawerWidth}px)`,
        padding: '16px',
        marginRight: '10px',
    },
}))

const MainLayout: React.FC = () => {
    const theme = useTheme()
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'))
    const leftDrawerOpened = useSelector((state: ReduxState) => state.customization.opened)
    const dispatch = useDispatch()
    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
                }}
            >
                <Toolbar>
                    <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                </Toolbar>
            </AppBar>
            <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
            <Main theme={theme} open={leftDrawerOpened}>
                <Breadcrumbs
                    separator={IconChevronRight}
                    navigation={navigation}
                    icon
                    title
                    rightAlign
                    card={undefined}
                    divider={undefined}
                    icons={undefined}
                    maxItems={undefined}
                    titleBottom={undefined}
                />
                <Outlet />
            </Main>
        </Box>
    )
}

export default MainLayout
