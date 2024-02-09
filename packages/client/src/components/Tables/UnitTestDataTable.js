import React, { useState } from 'react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MinimizeIcon from '@mui/icons-material/Minimize';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import {
  Avatar,
  Box,
  Chip,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as moment from 'moment';
import PropTypes from 'prop-types';

import MainCard from 'components/Cards/MainCard';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const lastResult = row.result[row.result.length - 1];
  const fillColour = (value) => {
    const numericValue = parseFloat(value);
    if (numericValue >= 90 && numericValue <= 100) {
      return 'success';
    } else if (numericValue >= 80 && numericValue < 90) {
      return 'warning';
    } else {
      return 'error';
    }
  };
  function getStatusChange(data) {
    if (!data.result || data.result.length < 2) {
      return <MinimizeIcon />;
    }

    const lastResult = data.result[data.result.length - 1];
    const secondLastResult = data.result[data.result.length - 2];

    if (!lastResult || !secondLastResult) {
      return 'Result data missing';
    }

    const lastPercentage = parseFloat(lastResult.percentage);
    const secondLastPercentage = parseFloat(secondLastResult.percentage);

    if (isNaN(lastPercentage) || isNaN(secondLastPercentage)) {
      return <MinimizeIcon />;
    }

    if (lastPercentage > secondLastPercentage) {
      return <NorthEastIcon />;
    } else if (lastPercentage < secondLastPercentage) {
      return <SouthEastIcon />;
    } else {
      return <MinimizeIcon />;
    }
  }
  const handleRowClick = (rowData, selected) => {
    window.open(`https://github.com/coincover/coincover-b2b2c/pull/${selected}`, '_blank');
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(lastResult.date).format('DD/MM/YYYY h:mm:ss')}
        </TableCell>
        <TableCell
          align="right"
          onClick={() => handleRowClick(historyRow, row.pull_request)}
          hover
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
        >
          {row.pull_request}
        </TableCell>
        <TableCell>
          <Tooltip title={lastResult.author || 'Not assigned'}>
            <Avatar alt={lastResult.author} src={`https://ui-avatars.com/api/?name=${lastResult.author}&background=random&?bold=true`} />
          </Tooltip>
        </TableCell>
        <TableCell>{lastResult.commit}</TableCell>
        <TableCell align="right">
          <Chip
            label={`${lastResult.percentage}%`}
            color={fillColour(lastResult.percentage)}
            variant="combined"
            sx={{ borderRadius: '5px', width: '100%' }}
          />
          {getStatusChange(row)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Author</TableCell>
                    <TableCell align="right">Commit</TableCell>
                    <TableCell align="right">Function Coverage</TableCell>
                    <TableCell align="right">Line Coverage</TableCell>
                    <TableCell align="right">Statement Coverage</TableCell>
                    <TableCell align="right">Overall Coverage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.result.map((historyRow) => (
                    <TableRow
                      key={historyRow.date}
                      onClick={() => handleRowClick(historyRow, row.pull_request)}
                      hover
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell component="th" scope="row">
                        {moment(historyRow.date).format('DD/MM/YYYY h:mm:ss')}
                      </TableCell>
                      <TableCell>{historyRow.author}</TableCell>
                      <TableCell align="right">{historyRow.commit}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${historyRow.function_coverage}%`}
                          color={fillColour(historyRow.function_coverage)}
                          variant="combined"
                          sx={{ borderRadius: '5px', width: '100%' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${historyRow.line_coverage}%`}
                          color={fillColour(historyRow.line_coverage)}
                          variant="combined"
                          sx={{ borderRadius: '5px', width: '100%' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${historyRow.statement_coverage}%`}
                          color={fillColour(historyRow.statement_coverage)}
                          variant="combined"
                          sx={{ borderRadius: '5px', width: '100%' }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={`${historyRow.percentage}%`}
                          color={fillColour(historyRow.percentage)}
                          variant="combined"
                          sx={{ borderRadius: '5px', width: '100%' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pull_request: PropTypes.string.isRequired,
    result: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        commit: PropTypes.string.isRequired,
        percentage: PropTypes.string.isRequired,
        statement_coverage: PropTypes.string.isRequired,
        function_coverage: PropTypes.string.isRequired,
        branch_coverage: PropTypes.string.isRequired,
        line_coverage: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

const UnitTestDataTable = ({ isLoading, data }) => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      {!isLoading && data.length > 0 ? (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Date</TableCell>
                <TableCell align="right">Pull Request</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Commit</TableCell>
                <TableCell align="right">Overall Coverage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <MainCard sx={{ boxShadow: theme.shadows[6] }}>
          <Typography sx={{ textAlign: 'center' }}>No Data</Typography>
        </MainCard>
      )}
    </>
  );
};

UnitTestDataTable.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array
};

export default UnitTestDataTable;
