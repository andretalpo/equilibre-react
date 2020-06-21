import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { AddExpenseForm } from '../../molecules';
import ApiService from '../../../api/service';





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

const AddExpenseDialog = (props) => {

    const [userInfo, setUserInfo] = useState(localStorage.getItem('user-info'));
    const [cards, setCards] = useState('');
    const [categories, setCategories] = useState('');

    useEffect(() => {
        async function getCategoryAndCardInfo() {
            const user = JSON.parse(userInfo)
            const categories = await ApiService.listAllCategories(user._id)
            setCategories(categories)
            const cards = await ApiService.listAllCards(user._id)
            setCards(cards);
          }
      
          getCategoryAndCardInfo();

      }, [userInfo]);

    const [open, setOpen] = React.useState(false);

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (    
        <div className={classes.root}>
            <IconButton className={classes.root} color="secondary" onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <AddExpenseForm cards={cards} category={categories}/>
                    <Button className="button-secondary button-align w-100 mb-10" onClick={handleClose}>
                        Cancelar
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddExpenseDialog;