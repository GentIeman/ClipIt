import * as yup from 'yup';

export const signInSchema = yup.object({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .min(6, "Email must be at least 6 characters long")
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required')
});

export const signUpSchema = yup.object({
    username: yup
        .string()
        .min(6, "Username must be at least 6 characters long")
        .required('Username is required'),
    email: yup
        .string()
        .min(6, "Email must be at least 6 characters long")
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required')
});
