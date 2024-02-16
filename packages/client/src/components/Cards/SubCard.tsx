import React, { forwardRef, ReactNode } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface SubCardProps {
    children?: ReactNode
    content?: boolean
    contentClass?: string
    darkTitle?: boolean
    secondary?: ReactNode | string | object
    sx?: object
    contentSX?: object
    title?: ReactNode
    action?: ReactNode
}

const SubCard = forwardRef<HTMLDivElement, SubCardProps>(
    (
        {
            children,
            content = true,
            contentClass,
            darkTitle,
            secondary,
            sx = {},
            contentSX = {},
            title,
            action,
            ...others
        },
        ref
    ) => {
        const theme = useTheme()

        return (
            <Card
                ref={ref}
                sx={{
                    border: '1px solid',
                    borderColor: theme.palette.primary.light,
                    ':hover': {
                        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
                    },
                    ...sx,
                }}
                {...others}
            >
                {/* card header and action */}
                {title && (
                    <CardHeader
                        sx={{ p: 2.5 }}
                        title={
                            <Typography variant={darkTitle ? 'h4' : 'h5'}>
                                {title}
                            </Typography>
                        }
                        action={action}
                    />
                )}

                {/* content & header divider */}
                {title && (
                    <Divider
                        sx={{
                            opacity: 1,
                            borderColor: theme.palette.primary.light,
                        }}
                    />
                )}

                {/* card content */}
                {content && (
                    <CardContent
                        sx={{ p: 2.5, ...contentSX }}
                        className={contentClass || ''}
                    >
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        )
    }
)

export default SubCard
