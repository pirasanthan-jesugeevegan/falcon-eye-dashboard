import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import * as moment from 'moment'
import PropTypes from 'prop-types'

import { getSlugByName } from '../../utils/product-name-converter'
import Transitions from '../extended/Transitions'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: 'auto',
    overflowY: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
}
const TestDataTable = ({ data }) => {
    const [selectedRowData, setSelectedRowData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleRowClick = (rowData) => {
        setSelectedRowData(rowData)
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Pass</TableCell>
                            <TableCell>Fail</TableCell>
                            <TableCell>Skip</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((d) => (
                                <TableRow
                                    key={d.id}
                                    onClick={() => handleRowClick(d)}
                                    hover
                                    style={{ cursor: 'pointer' }}
                                >
                                    <TableCell>
                                        {moment(d.date).format('DD/MM/YY')}
                                    </TableCell>
                                    <TableCell>{d.pass}</TableCell>
                                    <TableCell>{d.fail}</TableCell>
                                    <TableCell>{d.skip}</TableCell>
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
            <Transitions in={isModalOpen}>
                <Modal
                    open={isModalOpen}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography
                            id="modal-modal-title"
                            variant="h3"
                            component="h2"
                        >
                            {selectedRowData?.title} Test Run at{' '}
                            {moment(selectedRowData?.date).format('DD/MM/YY')}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <iframe
                                src={`https://coincover.github.io/coincover-amt/${getSlugByName(
                                    selectedRowData?.title
                                )}/functional/${moment(
                                    selectedRowData?.date
                                ).format('YYYY-MM-DD')}/index.html`}
                                title="Modal Iframe"
                                width="100%"
                                height="600px"
                            ></iframe>
                        </Typography>
                    </Box>
                </Modal>
            </Transitions>
        </div>
    )
}

TestDataTable.propTypes = {
    data: PropTypes.array,
}

export default TestDataTable
