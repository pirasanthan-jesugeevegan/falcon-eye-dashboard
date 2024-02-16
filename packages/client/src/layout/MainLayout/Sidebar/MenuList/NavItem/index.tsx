import React, { forwardRef, useEffect } from 'react'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import {
    Avatar,
    Chip,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { MENU_OPEN, SET_MENU } from '../../../../../redux/actions'

const NavItem = ({ item, level }: { item: MenuItem; level: number }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const customization = useSelector((state: any) => state.customization)
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'))

    const Icon = item.icon
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width:
                    customization.isOpen.findIndex(
                        (id: string) => id === item?.id
                    ) > -1
                        ? 8
                        : 6,
                height:
                    customization.isOpen.findIndex(
                        (id: string) => id === item?.id
                    ) > -1
                        ? 8
                        : 6,
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    )

    let itemTarget = '_self'

    let listItemProps = {
        component: forwardRef<HTMLAnchorElement>((props, ref) => (
            <RouterLink
                ref={ref}
                {...props}
                to={item.url}
                target={itemTarget}
            />
        )),
    }

    const itemHandler = (id: string) => {
        dispatch({ type: MENU_OPEN, id })
        if (matchesSM) dispatch({ type: SET_MENU, opened: false })
    }

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id)
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id })
        }
        // eslint-disable-next-line
    }, [pathname])

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                borderRadius: `${customization.borderRadius}px`,
                mb: 0.5,
                alignItems: 'flex-start',
                backgroundColor:
                    level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`,
            }}
            selected={
                customization.isOpen.findIndex((id: string) => id === item.id) >
                -1
            }
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
                {itemIcon}
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography
                        variant={
                            customization.isOpen.findIndex(
                                (id: string) => id === item.id
                            ) > -1
                                ? 'h5'
                                : 'body1'
                        }
                        color="inherit"
                    >
                        {item.title}
                    </Typography>
                }
                secondary={
                    item.caption && (
                        <Typography
                            variant="caption"
                            sx={{ ...theme.typography.subMenuCaption }}
                            display="block"
                            gutterBottom
                        >
                            {item.caption}
                        </Typography>
                    )
                }
            />
            {item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={
                        item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>
                    }
                />
            )}
        </ListItemButton>
    )
}

export default NavItem
