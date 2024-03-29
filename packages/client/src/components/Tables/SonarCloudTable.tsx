import React, { useState } from 'react'
import { Avatar, Tooltip, Typography } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { IconGitPullRequest, IconSquareCheck, IconSquareX } from '@tabler/icons'
import moment from 'moment'

const SonarCloudTable = ({ data }: { data: PullRequest[] }) => {
    const [page, setPage] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(10)

    function stringAvatar(name: string) {
        const words = name.split(' ')

        if (words.length === 1) {
            return {
                children: `${name[0]}`,
            }
        } else {
            return {
                children: `${words[0][0]}${words[1][0]}`,
            }
        }
    }
    const handleRowClick = (rowData: PullRequest) => {
        window.open(rowData.url, '_blank')
    }

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pull Request</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Checked Date</TableCell>
                            <TableCell>Commit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((d: PullRequest) => (
                            <TableRow key={d.key} onClick={() => handleRowClick(d)} hover style={{ cursor: 'pointer' }}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            mr: 1,
                                            mt: 1.75,
                                            mb: 0.75,
                                        }}
                                    >
                                        <IconGitPullRequest /> {d.key} - {d.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {d.status.qualityGateStatus === 'OK' ? (
                                        <IconSquareCheck color="#7bc62d" />
                                    ) : (
                                        <IconSquareX color="#ff4500" />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={d.commit?.author?.name}>
                                        <Avatar {...stringAvatar(d.commit?.author?.name)} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={moment(d.analysisDate).format('MMMM Do YYYY, h:mm:ss a')}>
                                        <span>{moment(d.analysisDate).startOf('hour').fromNow()}</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>{d.commit.sha.substring(0, 7)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    )
}

export default SonarCloudTable
