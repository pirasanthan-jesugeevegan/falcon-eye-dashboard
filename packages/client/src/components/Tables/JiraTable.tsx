import React from 'react'
import {
    Avatar,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import moment from 'moment'

const JiraTable = ({ data }: { data: Issue[] }) => {
    const handleRowClick = (rowData: Issue) => {
        window.open(
            `https://coincover.atlassian.net/browse/${rowData.key}`,
            '_blank'
        )
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Jira Number</TableCell>
                            <TableCell>Summary</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Assignee</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Last Updated</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((d: Issue) => (
                            <TableRow
                                key={d.id}
                                onClick={() => handleRowClick(d)}
                                hover // Add hover property for hover effect
                                style={{ cursor: 'pointer' }} // Change cursor on hover
                            >
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontWeight: 500,
                                            mr: 1,
                                            mt: 1.75,
                                            mb: 0.75,
                                        }}
                                    >
                                        {d.key}
                                    </Typography>
                                </TableCell>
                                <TableCell>{d.fields.summary}</TableCell>
                                <TableCell>
                                    <Chip
                                        variant="filled"
                                        color="secondary"
                                        label={d.fields.status.name}
                                        sx={{
                                            borderRadius: '5px',
                                            width: '100%',
                                        }}
                                        size="medium"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Tooltip
                                        title={
                                            d.fields?.assignee?.displayName ||
                                            'Not assigned'
                                        }
                                    >
                                        <Avatar
                                            alt={
                                                d.fields?.assignee?.displayName
                                            }
                                            src={
                                                d.fields?.assignee?.avatarUrls[
                                                    '48x48'
                                                ]
                                            }
                                        />
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip
                                        title={moment(d.fields.created).format(
                                            'MMMM Do YYYY, h:mm:ss a'
                                        )}
                                    >
                                        <span>
                                            {moment(d.fields.created)
                                                .startOf('hour')
                                                .fromNow()}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip
                                        title={moment(d.fields.updated).format(
                                            'MMMM Do YYYY, h:mm:ss a'
                                        )}
                                    >
                                        <span>
                                            {moment(d.fields.updated)
                                                .startOf('hour')
                                                .fromNow()}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default JiraTable
