import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, TableSortLabel, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const ConfigurableTransactionTable = ({ rows, columns, rowsPerPageOptions, defaultRowsPerPage, showRowsPerPageOptions, sortable }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0].id);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                sortDirection={sortable && orderBy === column.id ? order : false}
              >
                {sortable ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id}>
                      {column.id === 'amount' ? (
                        <span style={{ color: value.includes('-') ? 'red' : 'green' }}>
                          {value}
                        </span>
                      ) : column.id === 'receipt' ? (
                        <Button variant="outlined" size="small">
                          Download
                        </Button>
                      ) : (
                        value
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={showRowsPerPageOptions ? rowsPerPageOptions : []}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

ConfigurableTransactionTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rowsPerPageOptions: PropTypes.array,
  defaultRowsPerPage: PropTypes.number,
  showRowsPerPageOptions: PropTypes.bool,
  sortable: PropTypes.bool,
};

ConfigurableTransactionTable.defaultProps = {
  rowsPerPageOptions: [5, 10, 25],
  defaultRowsPerPage: 5,
  showRowsPerPageOptions: true,
  sortable: true,
};

export default ConfigurableTransactionTable;
