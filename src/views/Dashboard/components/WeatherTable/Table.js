import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  FormControlLabel,
  Switch,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { useCity } from '../../../../hooks/useCity';

function createData(cidade, data, tempMax, tempMin, probPrecipitacao) {
  return { cidade, data, tempMax, tempMin, probPrecipitacao };
}




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


const headCells = [
  { id: 'cidade', numeric: false, disablePadding: false, label: 'Cidade' },
  { id: 'data', numeric: true, disablePadding: false, label: 'Data' },
  { id: 'tempMax', numeric: true, disablePadding: false, label: 'Temperatura Máxima' },
  { id: 'tempMin', numeric: true, disablePadding: false, label: 'Temperatura Mínima' },
  { id: 'probPrecipitacao', numeric: true, disablePadding: false, label: 'Probabilidade de Precipitação' },
];

function EnhancedTableHead(props) {


  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" />
        {headCells.map((headCell) => (
          <TableCell
            align={headCell.numeric ? 'right' : 'left'}
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar >

      <Typography
        className={classes.title}
        component="div"
        id="tableTitle"
        variant="h3"
      >
        Tabela de Previsões Meteorológica
      </Typography>


    </Toolbar>
  );
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

// eslint-disable-next-line react/no-multi-comp
export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const { citiesData } = useCity();

  const rows = citiesData.map(element => createData(element.local,
    element.data.forecastDate,
    element.data.tMax, element.data.tMin, element.data.precipitaProb));

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar />

        <TableContainer>
          <Table
            aria-label="enhanced table"
            aria-labelledby="tableTitle"
            className={classes.table}
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              classes={classes}
              onRequestSort={handleRequestSort}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (

                    <TableRow
                      hover
                      key={row.cidade}
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell padding="checkbox" />
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                      >
                        {row.cidade}
                      </TableCell>
                      <TableCell align="right">{row.data}</TableCell>
                      <TableCell align="right">{row.tempMax}</TableCell>
                      <TableCell align="right">{row.tempMin}</TableCell>
                      <TableCell align="right">{row.probPrecipitacao} {'%'}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }} />
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rows.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Paper>
      <FormControlLabel
        control={<Switch
          checked={dense}
          onChange={handleChangeDense}
        />}
        label="Dense padding"
      />
    </div>
  );
}
