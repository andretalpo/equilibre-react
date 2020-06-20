import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Button } from '../../atoms';
import formSchema from './EditExpenseForm.schema';
import Formatter from '../../../utils/Formatter';

function EditExpenseForm({ expense }) {
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const initialState = {
        "name": expense.name,
        "value": Formatter.formatValue(expense.value),
        "date": expense.date,
        "stablishment": expense.stablishment,
        "category": expense.category,
        "card": expense.card
    };

    const onSubmit = () => {

    }

    return (
        <Formik
            initialValues={initialState}
            validationSchema={formSchema}
            onSubmit={onSubmit}
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
                        <Field
                            component={TextField}
                            name="date"
                            type="text"
                            label="Data"
                        />
                        <Field
                            component={TextField}
                            name="category.name"
                            type="text"
                            label="Categoria"
                        />
                        <Field
                            component={TextField}
                            name="card.name"
                            type="text"
                            label="Cartão"
                        />

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