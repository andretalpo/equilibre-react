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
import Formatter from '../../../utils/Formatter';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
        paddingLeft: '10px',
        marginBottom: '8px',
        borderRadius: '8px',
    },
    inline: {
        display: 'block',
    },
    colorDefault: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
    }
}));

const ExpenseListItem = ({ expense }) => {
    const classes = useStyles();
    return (
        <ListItem classes={{ root: classes.root }} disableGutters alignItems="flex-start">
            <ListItemAvatar>
                <Avatar classes={{ colorDefault: classes.colorDefault }}>{Formatter.formatDate(expense.date)}</Avatar>
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
                            {expense.category.name}
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
                    {`R$${Formatter.formatValue(expense.value)}`}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>

    );
}

export default ExpenseListItem;