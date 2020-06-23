import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string()
        .required('Campo obrigatório')
        .min(3, 'Mínimo de 3 caracteres')
        .max(20, 'Máximo de 20 caracteres'),
});

export default formSchema;