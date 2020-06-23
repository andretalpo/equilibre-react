import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string()
        .required('Campo obrigatório')
        .min(3, 'Mínimo de 3 caracteres')
        .max(100, 'Máximo de 100 caracteres'),
    value: yup.number()
        .required('Campo obrigatório')
        .min(0, 'Valor mínimo é 0'),
    stablishment: yup.string()
        .min(3, 'Mínimo de 3 caracteres')
        .max(100, 'Máximo de 100 caracteres'),
});

export default formSchema;