import React from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Button } from '../../atoms';
import formSchema from '../EditCategoryForm/EditCategoryForm.schema';

function AddCategoryForm( props ) {
    const initialState = {
        "name": '',
    };

    return (
        <Formik
            initialValues={initialState}
            validationSchema={formSchema}
            onSubmit={values => {
                props.handleClose();
                props.addCategory(values)
                props.onChange()}}
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

                        <Button type="submit" className="button-primary button-align">
                            Adicionar
                        </Button>
                    </Form>
                )
            }
        </Formik>
    );
}

export default AddCategoryForm;