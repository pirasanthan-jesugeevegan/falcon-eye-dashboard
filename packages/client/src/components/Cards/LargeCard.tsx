import { Avatar, Box, Grid, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import MainCard from './MainCard'
import SkeletonEarningCard from './Skeleton/LargeCard'
import React from 'react'

interface LargeCardProps {
    isLoading?: boolean
    title?: string
    subtitle?: string
    icon?: React.ElementType | string
    backgroundColor?: string
}

const CardWrapper = styled(MainCard)<{ backgroundColor: any }>(
    ({ theme, backgroundColor }) => ({
        backgroundColor:
            theme.palette.mode === 'light'
                ? backgroundColor.dark
                : theme.palette.dark.dark,
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background:
                theme.palette.mode === 'light'
                    ? backgroundColor[800]
                    : 'linear-gradient(140.9deg, rgb(101, 31, 255) -14.02%, rgba(144, 202, 249, 0) 85.5%)',
            borderRadius: '50%',
            top: -85,
            right: -95,
            [theme.breakpoints.down('sm')]: {
                top: -105,
                right: -140,
            },
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            width: 210,
            height: 210,
            background: backgroundColor[800],
            borderRadius: '50%',
            top: -125,
            right: -15,
            opacity: 0.5,
            [theme.breakpoints.down('sm')]: {
                top: -155,
                right: -70,
            },
        },
    })
)

const LargeCard: React.FC<LargeCardProps> = ({
    isLoading,
    title,
    subtitle,
    icon,
    backgroundColor,
}) => {
    const theme = useTheme()
    const Icon = icon
    const backgroundColorPicker = (backgroundColor: any, theme: any) => {
        if (backgroundColor === 'primary') {
            return theme.palette.primary
        } else if (backgroundColor === 'secondary') {
            return theme.palette.secondary
        } else {
            return theme.palette.primary
        }
    }

    return (
        <>
            {isLoading || !title ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper
                    border={false}
                    content={false}
                    backgroundColor={
                        backgroundColorPicker(backgroundColor, theme) ||
                        'primary'
                    }
                    sx={{ boxShadow: theme.shadows[10] }}
                >
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography
                                                    .commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor:
                                                    backgroundColorPicker(
                                                        backgroundColor,
                                                        theme
                                                    )[800],
                                                mt: 1,
                                            }}
                                        >
                                            {Icon ? ( // Check if Icon is defined
                                                typeof Icon === 'string' ? (
                                                    <img
                                                        src={icon as string}
                                                        alt="Notification"
                                                    />
                                                ) : (
                                                    <Icon
                                                        stroke={1.5}
                                                        size="1.3rem"
                                                        color="#ffffff"
                                                    />
                                                )
                                            ) : null}
                                        </Avatar>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        <Typography
                                            sx={{
                                                fontSize: '2.125rem',
                                                fontWeight: 500,
                                                mr: 1,
                                                mt: 1.75,
                                                mb: 0.75,
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ mb: 1.25 }}>
                                <Typography
                                    sx={{
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color:
                                            theme.palette.mode === 'light'
                                                ? backgroundColorPicker(
                                                      backgroundColor,
                                                      theme
                                                  )[200]
                                                : '#8492c4',
                                    }}
                                >
                                    {subtitle}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
    )
}

export default LargeCard
