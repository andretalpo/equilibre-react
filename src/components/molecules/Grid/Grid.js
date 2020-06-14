import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function mainGrid({...props}, images) {
  const classes = useStyles();
  const imagesGrid = images.map((value,index) => {
   return (
        <Grid item xs={6} sm={3}>
            <Paper className={classes.paper}>
                <img src={value.url} alt={`pic-${index}`} ></img>
            </Paper>
        </Grid>
   ) 
  })
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          {imagesGrid}
      </Grid>
    </div>
  );
}