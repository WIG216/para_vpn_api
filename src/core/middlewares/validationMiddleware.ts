import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError } from 'yup';
import { errorCodes } from '../constants';

export const validateSchema = (schema: ObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await schema.validate(req.body, { abortEarly: false }); 
        next();
    } catch (error: any) {
        if (error instanceof ValidationError) {
            const formattedErrors = error.inner.map(err => ({
                path: err.path,
                message: err.message,
            }));

            res.status(400).json({ status: "Error", message: errorCodes.validationError, errors: formattedErrors }); 
        }else{
            next(error); 
        }
    }
};
