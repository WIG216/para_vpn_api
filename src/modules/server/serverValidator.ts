import * as yup from 'yup';

export const userRegistrationSchema = yup.object({
 name: yup.string().required('Name is required'),
});
