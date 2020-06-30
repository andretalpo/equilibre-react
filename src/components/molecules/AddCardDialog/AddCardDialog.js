import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddCardForm } from '../../molecules';

const AddCardDialog = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div className="add-button-align">
                <Button size="small" variant="outlined" onClick={handleClickOpen}>Adicionar</Button>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Adicionar Cartão</DialogTitle>
                <DialogContent>
                    <AddCardForm userInfo={props.userInfo} closeDialog={handleClose} submitMethod={props.addMethod} onChange={props.onChange} />
                    <Button className="button-secondary button-align w-100 mb-10" onClick={handleClose}>
                        Cancelar
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddCardDialog;