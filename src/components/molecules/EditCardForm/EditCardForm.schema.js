import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string()
        .required('Campo obrigatório')
        .min(3, 'Mínimo de 3 caracteres')
        .max(20, 'Máximo de 20 caracteres'),
    provider: yup.string()
        .min(3, 'Mínimo de 3 caracteres')
        .max(50, 'Máximo de 20 caracteres'),
    expiration_date: yup.string()
        .min(3, 'Mínimo de 7 caracteres')
        .max(20, 'Máximo de 7 caracteres')
        .matches(/^(?:0[1-9]|1[0-2])\/[0-9]{4}/, 'Formato mm/aaaa'),
});

export default formSchema;