import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditCardDialog from '../EditCardDialog/EditCardDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
        paddingLeft: '20px',
        marginBottom: '8px',
        borderRadius: '8px',
    },
    inline: {
        display: 'block',
    }
}));

const CardListItem = ({ card, deleteMethod, editMethod }) => {
    const classes = useStyles();
    return (
        <ListItem classes={{ root: classes.root }} >

            <ListItemText
                primary={card.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            {card.provider}
                        </Typography>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Expira em {card.expiration_date}
                        </Typography>
                    </React.Fragment>
                }
            />

            <ListItemSecondaryAction>
                <div className="side-icon-button">
                    <EditCardDialog
                        title="Editar Cartão"
                        card={card}
                        submitMethod={editMethod} />
                    <IconButton onClick={() => deleteMethod(card)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </ListItemSecondaryAction>

        </ListItem>
    );
}

export default CardListItem;