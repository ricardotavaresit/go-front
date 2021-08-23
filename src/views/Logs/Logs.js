import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { LatestOrders } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Logs = (props) => {
  const classes = useStyles();

  return (
    <div
      className={classes.root}
    >
      <LatestOrders />
    </div>
  );
};

export default Logs;
