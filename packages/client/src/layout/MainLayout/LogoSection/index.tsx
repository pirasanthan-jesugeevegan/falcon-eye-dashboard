import { ButtonBase, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Logo from '../../../components/Logo'
import config from '../../../config'

import { MENU_OPEN } from '../../../redux/actions'
import React from 'react'

const LogoSection = () => {
    const defaultId = useSelector((state: ReduxState) => state.customization.defaultId)
    const dispatch = useDispatch()
    const theme = useTheme()

    return (
        <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.basename}>
            <div style={{ textAlignLast: 'center' }}>
                <Typography
                    sx={{
                        fontSize: 'xx-large',
                        fontFamily: 'system-ui',
                        fontWeight: 'bolder',
                        color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : undefined,
                    }}
                >
                    FALCON EYE
                </Typography>
                <Logo />
            </div>
        </ButtonBase>
    )
}

export default LogoSection
