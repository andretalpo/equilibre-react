import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { AddCategoryForm } from '../../molecules';
import './AddCategoryDialog.css';





const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    colorDefault: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
    },
    }));



const AddCategoryDialog = (props) => {

    const [open, setOpen] = useState(false);
 
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (    
        <div className={classes.root}>
            <Button size="small" variant="outlined" onClick={handleClickOpen}>Adicionar</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar categoria</DialogTitle>
                <DialogContent>
                    <AddCategoryForm handleClose={handleClose} addCategory={props.addCategory} onChange={props.onChange}/>
                    <Button className="button-secondary button-align w-100 mb-10" onClick={handleClose}>
                        Cancelar
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddCategoryDialog;