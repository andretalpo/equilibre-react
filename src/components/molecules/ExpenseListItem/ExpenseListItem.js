import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'block',
    },
}));

const ExpenseListItem = ({ expense, index }) => {
    const classes = useStyles();
    return (
        <ListItem disableGutters alignItems="flex-start" key={index}>
            <ListItemAvatar>
                <Avatar>{expense.date}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={expense.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {expense.stablishment}
                        </Typography>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {expense.category}
                        </Typography>
                    </React.Fragment>
                }
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="comments">
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="comments">
                    <DeleteIcon />
                </IconButton>
                <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                >
                    {expense.value}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

    );
}

export default ExpenseListItem;