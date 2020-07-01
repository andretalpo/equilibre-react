import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';






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



const ConfirmDialog = (props) => {

    const [open, setOpen] = useState(false);
 
    const classes = useStyles();

    const handleClose = () => {
        props.okMethod();
        setOpen(false);
    };

    return (    
        <div className={classes.root}>
            <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Erro!</DialogTitle>
                <DialogContent>
                    <Typography>{props.apiErrorMessage}</Typography>
                    <Button className="button-primary button-align w-100 mb-10"  onClick={handleClose}>
                        OK
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ConfirmDialog;