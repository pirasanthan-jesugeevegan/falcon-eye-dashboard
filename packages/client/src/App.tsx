import { CssBaseline, StyledEngineProvider } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import NavigationScroll from 'layout/NavigationScroll'
import Routes from 'routes'
import themes from 'themes'

import React from 'react'

const App = () => {
    const customization = useSelector(
        (state: ReduxState) => state.customization
    )
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

export default App
