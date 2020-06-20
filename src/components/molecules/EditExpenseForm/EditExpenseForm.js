import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Button } from '../../atoms';
import formSchema from './EditExpenseForm.schema';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import UTCMomentUtils from '../../../utils/UTCMomentUtils';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';

function EditExpenseForm({ expense, cards, categories, submitMethod }) {
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const initialState = {
        "name": expense.name,
        "value": expense.value,
        "date": expense.date,
        "stablishment": expense.stablishment,
        "category": expense.category,
        "card": expense.card
    };
    const [selectedCard, setSelectedCard] = useState(initialState.card);
    const [selectedCategory, setSelectedCategory] = useState(initialState.category);
    const [selectedDate, handleChangeDate] = useState(initialState.date);

    const handleChangeCard = (e) => {
        setSelectedCard(e.target.value);
    }

    const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const onSubmitForm = async (values, action) => {
        submitMethod({
            ...values,
            _id: expense._id,
            date: moment(selectedDate).utc().format('yyyy-MM-DD'),
            card: selectedCard._id,
            category: selectedCategory._id
        });
    }

    return (
        <Formik
            initialValues={initialState}
            validationSchema={formSchema}
            onSubmit={onSubmitForm}
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
                            type="number"
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
                                label="De"
                                format="DD/MM/yyyy"
                                value={selectedDate}
                                onChange={handleChangeDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <FormControl fullWidth>
                            <InputLabel id="select-card">Categoria</InputLabel>
                            <Select value={selectedCategory} onChange={handleChangeCategory} labelId="select-category">
                                {categories.map((category, index) => <MenuItem key={index} value={category}>{`${category.name}`}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="select-card">Cartão</InputLabel>
                            <Select value={selectedCard} onChange={handleChangeCard} labelId="select-card">
                                {cards.map((card, index) => <MenuItem key={index} value={card}>{`${card.name}`}</MenuItem>)}
                            </Select>
                        </FormControl>

                        {isSubmitting && <LinearProgress />}

                        {apiErrorMessage ? <p>{apiErrorMessage}</p> : ''}

                        <Button type="submit" className="button-primary button-align">
                            Salvar
                        </Button>
                    </Form>
                )
            }
        </Formik>
    );
}

export default EditExpenseForm;