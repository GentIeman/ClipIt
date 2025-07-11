import * as yup from 'yup';

export const signInSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required')
        .min(6, "Email must be at least 6 characters long"),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
});

export const signUpSchema = yup.object({
    username: yup
        .string()
        .required('Username is required')
        .min(6, "Username must be at least 6 characters long"),
    email: yup
        .string()
        .required('Email is required')
        .min(6, "Email must be at least 6 characters long")
        .email('Please enter a valid email address'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long')
});
