import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AddExpenseDialog } from '../../molecules';





const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  colorDefault: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main
  },
}));


export default function FloatingButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AddExpenseDialog />
    </div>
  );
}
