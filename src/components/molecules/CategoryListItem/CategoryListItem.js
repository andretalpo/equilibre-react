import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { ModalEditCategory } from '../../molecules';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.secondary.main,
        paddingLeft: '10px',
        marginBottom: '8px',
        borderRadius: '8px',
    },
}));


export default function CategoryListItem(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem classes={{ root: classes.root }} disableGutters alignItems="flex-start">
            <ListItemText
                primary={`${props.element.name}`}
            />
            <ListItemSecondaryAction>
                <div className="align-edit-delete-button">
                <ModalEditCategory   editCategory={props.editCategory} categoryId={props.element._id} categoryName={props.element.name} />
                <IconButton  edge="end" aria-label="delete" onClick={value => props.deleteCategory(`${props.element._id}`)}>
                    <DeleteIcon />
                </IconButton>
                </div>

            </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
