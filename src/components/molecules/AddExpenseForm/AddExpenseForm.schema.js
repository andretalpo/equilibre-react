import * as yup from 'yup';


const formSchema = yup.object().shape({
    name: yup.string()
        .required('Campo obrigatório')
        .min(3, 'Mínimo de 3 caracteres')
        .max(20, 'Máximo de 20 caracteres'),
    value: yup.string()
        .required('Campo obrigatório')
        .min(3, 'Mínimo de 3 caracteres')
        .matches(/^[+-]?[0-9]{1,3}(?:.?[0-9]{3})*(?:,[0-9]{1,2})?$/,'Formáto inválido'),
    stablishment: yup.string()
        .min(3, 'Mínimo de 3 caracteres')
        .max(100, 'Máximo de 100 caracteres'),
});

export default formSchema;