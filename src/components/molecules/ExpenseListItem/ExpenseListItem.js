import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Formatter from '../../../utils/Formatter';
import EditExpenseDialog from '../EditExpenseDialog/EditExpenseDialog';
import './ExpenseListItem.css';

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

const ExpenseListItem = ({ expense, cards, categories, deleteMethod, editMethod }) => {
    const classes = useStyles();
    return (
        <ListItem classes={{ root: classes.root }} disableGutters alignItems="flex-start">

            <ListItemAvatar>
                <Avatar variant="rounded" className="avatar-date" classes={{ colorDefault: classes.colorDefault }}>
                    <p className="avatar-text-large">{Formatter.getDay(expense.date)}</p>
                    <p className="avatar-text-small">{Formatter.getMonthYear(expense.date)}</p>
                </Avatar>
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
                <div className="side-icon-button">
                    <EditExpenseDialog
                        title="Editar Compra"
                        expense={expense}
                        cards={cards}
                        categories={categories}
                        submitMethod={editMethod} />
                    <IconButton onClick={() => deleteMethod(expense)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
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