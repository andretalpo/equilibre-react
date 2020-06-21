import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


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
      <Fab color="primary" aria-label="add" onClick={ values => props.addExpense}>
        <AddIcon color="secondary"/>
      </Fab>
    </div>
  );
}
