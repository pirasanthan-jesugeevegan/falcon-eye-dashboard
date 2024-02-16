import React, { forwardRef } from 'react'
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface MainCardProps {
    border?: boolean
    boxShadow?: boolean
    children?: React.ReactNode
    content?: boolean
    contentClass?: string
    contentSX?: Record<string, unknown>
    darkTitle?: boolean
    secondary?: React.ReactNode
    shadow?: string
    sx?: Record<string, unknown>
    title?: React.ReactNode
}

const headerSX = {
    '& .MuiCardHeader-action': { mr: 0 },
}

const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentClass = '',
            contentSX = {},
            darkTitle,
            secondary,
            shadow,
            sx = {},
            title,
            ...others
        }: MainCardProps,
        ref
    ) => {
        const theme = useTheme()

        return (
            <Card
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderColor: theme.palette.primary.light + 25,
                    ':hover': {
                        boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
                    },
                    ...sx,
                }}
            >
                {/* card header and action */}
                {title && (
                    <CardHeader
                        sx={headerSX}
                        title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
                        action={secondary}
                    />
                )}

                {/* content & header divider */}
                {title && <Divider />}

                {/* card content */}
                {content && (
                    <CardContent sx={contentSX} className={contentClass}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        )
    }
)

export default MainCard
