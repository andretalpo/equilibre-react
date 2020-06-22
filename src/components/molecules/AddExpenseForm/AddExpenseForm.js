import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Button } from '../../atoms';
import formSchema from './AddExpenseForm.schema';
import Formatter from '../../../utils/Formatter';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import UTCMomentUtils from '../../../utils/UTCMomentUtils';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';



const useStyles = makeStyles((theme) => ({
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));


function AddExpenseForm(props) {
    
    const initialState = {
        name: '',
        value: '',
        date: new Date() ,
        stablishment: '',
        category: '',
        card: '',
    };

    const classes = useStyles();
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [category, setCategory] = React.useState('');
    const [card, setCard] = React.useState('');
    const [selectedDate, handleChangeDate] = useState(initialState.date);




    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
      };


    const handleChangeCard = (event) => {
        setCard(event.target.value);
      };

    const categoryOptions = props.categories.map((element,index) => {
        return <MenuItem value={element.name} key={`options${index}`}>{element.name}</MenuItem>
      })
    const cardOptions = props.cards.map((element,index) => {
        return <MenuItem value={element.name} key={`options${index}`}>{element.name}</MenuItem>
    })

    return (
        <Formik
            initialValues={initialState}
            // validationSchema={formSchema}
            onSubmit={expense => {
                props.handleClose();
                props.addNewExpense(expense,category,card);
            }}
        >
            {
                ({ handleSubmit, isSubmitting, }) => (
                    <Form className="form-container" onSubmit={handleSubmit}>
                        <Field
                            component={TextField}
                            name="name"
                            type="text"
                            label="Nome"
                        />
                        <Field
                            component={TextField}
                            name="value"
                            type="text"
                            label="Valor"
                        />
                        <Field
                            component={TextField}
                            name="stablishment"
                            type="text"
                            label="Estabelecimento"
                        />
                        <MuiPickersUtilsProvider utils={UTCMomentUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-start"
                                label="Data"
                                format="DD/MM/yyyy"
                                // value={moment(selectedDate).utc().format('DD-MM-yyyy')}
                                value={selectedDate}
                                onChange={handleChangeDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <FormControl >
                            <InputLabel className={classes.formControl}id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                onChange={handleChangeCategory}
                                >
                                {categoryOptions}
                            </Select>
                        </FormControl>
                        <FormControl >
                            <InputLabel className={classes.formControl}id="demo-simple-select-label">Cartao</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={card}
                                onChange={handleChangeCard}
                                >
                                {cardOptions}
                            </Select>
                        </FormControl>

                        {isSubmitting && <LinearProgress />}

                        {apiErrorMessage ? <p>{apiErrorMessage}</p> : ''}

                        <Button type="submit" className="button-primary button-align">
                            Adicionar
                        </Button>
                    </Form>
                )
            }
        </Formik>
    );
}

export default AddExpenseForm;