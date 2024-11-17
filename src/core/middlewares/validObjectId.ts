import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { errorResponse } from '../helpers';
import { errorCodes } from '../constants';

export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(400)
            .json(errorResponse(errorCodes.invalidObjectId));
    }
    next();
};
