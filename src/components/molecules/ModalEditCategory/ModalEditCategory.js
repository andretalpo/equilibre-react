import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Formik, Form, Field } from 'formik';
import { Button } from '../../atoms';
import { TextField } from 'formik-material-ui';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const initialState = {
  category: '',
};


export default function ModalEditCategory(props) {
//   const classes = useStyles();
//   // getModalStyle is not a pure function, we roll the style only on the first render
//   const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log(props.categoryId)
  return (
    <div>
        <IconButton edge="end" aria-label="edit" onClick={handleOpen}>
            <EditIcon />
        </IconButton>
      {/* <button type="button" onClick={handleOpen}>
      </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          <div>
          <Formik
            initialValues={initialState}
            onSubmit={values => props.editCategory(values, props.categoryId)}
            >
            {
                ({ submitForm, isSubmitting, handleSubmit }) => (
                <Form className="form-container" onSubmit={ handleSubmit }>
                    <Field 
                        component={TextField}
                        name="category"
                        placeholder={props.categoryName}
                        type="text"
                        label="Categoria"
                    />
                    <Button type="submit" className="button-primary button-align" >
                        Salvar
                    </Button>

                    <Button className="button-secondary button-align" onClick={handleClose}>
                        Cancelar
                    </Button>
            </Form>
            )
        }
        </Formik>
          </div>

      </Modal>
    </div>
  );
}