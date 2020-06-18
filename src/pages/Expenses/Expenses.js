import React from 'react';
import { LoggedTemplate } from '../../templates';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'block',
    },
}));

const expenses = [
    {
        name: 'Café',
        stablishment: 'Frans Café',
        date: '17',
        value: 'R$ 80,00',
        category: 'Alimentação'
    }
]

const Expenses = (props) => {
    const classes = useStyles();
    return (
        <LoggedTemplate {...props} title="Compras">
            <List>
                {expenses.map((expense, index) =>
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
                            {/* <IconButton edge="end" aria-label="comments">
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="comments">
                                <DeleteIcon />
                            </IconButton> */}
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
                )}
            </List>
        </LoggedTemplate>
    );
}

export default Expenses;