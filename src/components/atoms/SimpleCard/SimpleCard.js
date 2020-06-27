import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CompPieChart } from '../../atoms';
import './SimpleCard.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
    
  return (
    <Card className={classes.root}>
      <CardContent className="center-graph-container">
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.title}
        </Typography>
        {/* <Typography variant="h5" component="h2">
          { props.data }

          {
            !props.graph
            ? {props.data}
            : <>
        }
        </Typography> */}
        {
            props.graph
            ? <CompPieChart data={props.data}/>
            : (
                <Typography variant="h5" component="h2">
                  { props.data }
                </Typography>
                          )
            }
      </CardContent>
    </Card>
  );
}