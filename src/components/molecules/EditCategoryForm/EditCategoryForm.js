import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Button } from '../../atoms';
import formSchema from './EditCategoryForm.schema';
import Formatter from '../../../utils/Formatter';

function EditCategoryForm( props ) {

    console.log(props.category)
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const initialState = {
        "name": props.category.name,
    };

    return (
        <Formik
            initialValues={initialState}
            validationSchema={formSchema}
            onSubmit={values => {
                props.handleClose();
                props.editCategory(values, props.category._id)}}
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

export default EditCategoryForm;