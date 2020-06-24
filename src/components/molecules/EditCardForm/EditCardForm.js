import React from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Button } from '../../atoms';
import formSchema from './EditCardForm.schema';

function EditCardForm({ card, submitMethod, closeDialog }) {
    const initialState = {
        "name": card.name,
        "provider": card.provider,
        "expiration_date": card.expiration_date,
    };

    const onSubmitForm = async (values) => {
        closeDialog();
        submitMethod(card._id, values);
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
                            name="provider"
                            type="text"
                            label="Bandeira"
                        />
                        <Field
                            component={TextField}
                            name="expiration_date"
                            type="text"
                            label="Data de expiração"
                        />

                        {isSubmitting && <LinearProgress />}

                        <Button type="submit" className="button-primary button-align">
                            Salvar
                        </Button>
                    </Form>
                )
            }
        </Formik>
    );
}

export default EditCardForm;