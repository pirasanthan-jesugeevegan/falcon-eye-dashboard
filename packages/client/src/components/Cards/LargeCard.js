import { Avatar, Box, Grid, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'

import MainCard from '../../components/Cards/MainCard'
import SkeletonEarningCard from '../../components/Cards/Skeleton/LargeCard'

const CardWrapper = styled(MainCard)(({ theme, backgroundColor }) => ({
    backgroundColor:
        theme.palette.mode === 'light'
            ? theme.palette[backgroundColor].dark
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
                ? theme.palette[backgroundColor][800]
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
        background: theme.palette[backgroundColor][800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70,
        },
    },
}))

const LargeCard = ({ isLoading, title, subtitle, icon, backgroundColor }) => {
    const theme = useTheme()
    const Icon = icon

    return (
        <>
            {isLoading || String(title).includes('undefined') ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper
                    border={false}
                    content={false}
                    backgroundColor={backgroundColor}
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
                                                    theme.palette[
                                                        backgroundColor
                                                    ][800],
                                                mt: 1,
                                            }}
                                        >
                                            {typeof Icon === 'string' ? (
                                                <img
                                                    src={icon}
                                                    alt="Notification"
                                                />
                                            ) : (
                                                <Icon
                                                    stroke={1.5}
                                                    size="1.3rem"
                                                    color="#ffffff"
                                                />
                                            )}
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
                                                ? theme.palette[
                                                      backgroundColor
                                                  ][200]
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

LargeCard.propTypes = {
    isLoading: PropTypes.bool,
    title: PropTypes.string,
    value: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.node,
    backgroundColor: PropTypes.string,
}

export default LargeCard
