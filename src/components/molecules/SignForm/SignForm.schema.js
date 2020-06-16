import * as yup from 'yup';

const formSchema = yup.object().shape({
    email: yup.string()
        .required('Campo obrigatório')
        .email('Formato inválido'),
    password: yup.string()
        .required('Campo obrigatório')
        .min(5, 'Mínimo de 5 caracteres')
        .max(100, 'Máximo de 100 caracteres'),
    name: yup.string()
        .required('Campo obrigatório')
        .min(1, 'Mínimo de 3 caracteres')
        .max(100, 'Máximo de 100 caracteres'),
});

export default formSchema;