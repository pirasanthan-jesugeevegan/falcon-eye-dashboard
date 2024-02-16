import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import React from 'react'
import MainCard from './MainCard'
import TotalIncomeCard from './Skeleton/TotalIncomeCard'

interface SmallCardProps {
    isLoading?: boolean
    title?: string
    subtitle?: string
    result?: string | null
    icon?: React.ReactNode
    backgroundColor?: string
}

const CardWrapper = styled(MainCard)<{ backgroundColor?: any }>(({ theme, backgroundColor }) => ({
    backgroundColor: theme.palette.mode === 'light' ? backgroundColor && backgroundColor.dark : theme.palette.dark.dark,
    color: backgroundColor && backgroundColor.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${
            backgroundColor ? backgroundColor[200] : theme.palette.warning.dark
        } -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180,
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${
            backgroundColor ? backgroundColor[200] : theme.palette.warning.dark
        } -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130,
    },
}))

const SmallCard: React.FC<SmallCardProps> = ({ isLoading, title, subtitle, result, icon, backgroundColor }) => {
    const theme = useTheme()
    const resultColor = (backgroundColor: string | undefined, result: string | undefined) => {
        if (result === 'OK') {
            return theme.palette.success.main
        } else if (result === 'ERROR') {
            return theme.palette.orange.dark
        } else if (backgroundColor) {
            return '#fff'
        } else {
            return 'black'
        }
    }
    const backgroundColorPicker = (backgroundColor: any, theme: any) => {
        if (backgroundColor === 'primary') {
            return theme.palette.primary
        } else if (backgroundColor === 'secondary') {
            return theme.palette.secondary
        } else {
            undefined
        }
    }
    return (
        <>
            {isLoading || !title || !result ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper
                    border={false}
                    content={false}
                    backgroundColor={backgroundColorPicker(backgroundColor, theme)}
                    sx={{ boxShadow: theme.shadows[10] }}
                >
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor:
                                                theme.palette.mode === 'light'
                                                    ? backgroundColor
                                                        ? backgroundColorPicker(backgroundColor, theme)[800]
                                                        : theme.palette.warning.light
                                                    : theme.palette.dark.main,
                                            color: backgroundColor ? '#fff' : theme.palette.warning.dark,
                                        }}
                                    >
                                        {icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45,
                                    }}
                                    primary={
                                        <Typography
                                            variant="h4"
                                            sx={{
                                                color: backgroundColor && '#fff',
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: backgroundColor ? 'primary.light' : theme.palette.grey[500],
                                                mt: 0.25,
                                            }}
                                        >
                                            {subtitle}
                                        </Typography>
                                    }
                                />
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: resultColor(backgroundColor, result),
                                    }}
                                >
                                    {result}
                                </Typography>
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    )
}

export default SmallCard
