import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { RegionFilter, WeatherChart, LatestOrders } from './components';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
      >

        <Grid
          item
          xs={12}
        >
          <RegionFilter />
        </Grid>


        <Grid
          item
          xs={12}
        >
          <WeatherChart />
        </Grid>


        <Grid
          item
          xs={12}
        >

          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};
export default Dashboard;
