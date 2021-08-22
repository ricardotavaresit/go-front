import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';


import { useCity } from '../../../../hooks/useCity';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));


const DataTable = props => {
  const { className, ...rest } = props;
  const { citiesData } = useCity();

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Previsão meteorológica - Table"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
   
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cidade</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Temperatura Máxima</TableCell>
                  <TableCell>Temperatura Minima</TableCell>
                  <TableCell>Probabiliadde Precipitação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {citiesData && citiesData.map(({ local, data }) => (
                  <TableRow
                    hover
                    key={local}
                  >
                    <TableCell>{local}</TableCell>
                    <TableCell>{data.forecastDate}</TableCell>
                    <TableCell>{data.tMax}</TableCell>
                    <TableCell>{data.tMin}</TableCell>
                    <TableCell>{data.precipitaProb}%</TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

DataTable.propTypes = {
  className: PropTypes.string
};

export default DataTable;
