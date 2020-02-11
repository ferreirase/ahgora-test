import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function ActiveButton({value, func}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={func}>
        {value}
      </Button>
    </div>
  );
}

export function DisableButton({value}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button variant="contained" disabled>
        {value}
      </Button>
    </div>
  );
}