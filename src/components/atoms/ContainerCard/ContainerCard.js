import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

const ContainerCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={`${classes.root} ${props.className}`}>
            <CardContent className="center-graph-container">
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.title}
                </Typography>
                {props.children}
            </CardContent>
        </Card>
    );
}

export default ContainerCard;