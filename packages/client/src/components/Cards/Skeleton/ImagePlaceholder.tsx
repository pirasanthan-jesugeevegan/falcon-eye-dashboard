import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const ImagePlaceholder = ({ ...others }) => <Skeleton variant="rectangular" {...others} animation="wave" />

export default ImagePlaceholder
