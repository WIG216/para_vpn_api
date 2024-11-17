import * as yup from 'yup';

export const userRegistrationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
    name: yup.string().required('Name is required'),
});

export const userLoginSchema = yup.object({
    username: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});
