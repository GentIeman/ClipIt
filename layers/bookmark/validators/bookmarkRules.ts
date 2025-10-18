import * as yup from 'yup';

export const bookmarkSchema = yup.object({
    link: yup
        .string()
        .url()
        .required('URL is required')
});