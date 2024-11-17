import { Request, Response } from 'express';
import User, { IUser } from './userModel';
import { comparePassword, errorCodes, errorResponse, generateAccessToken, generateRefreshToken, hashPassword, logger, successCodes, successResponse } from '../../core';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find()
            .populate({
                path: 'profile',
                populate: { path: 'permissions' }
            })

        res.status(200).json(successResponse({ data: users, message: successCodes.operationSuccessful }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id)
            .populate({
                path: 'profile',
                populate: { path: 'permissions' }
            })

            if(!user){
                res.status(404).json(errorResponse( errorCodes.user.notFound ));
            }

        res.status(200).json(successResponse({ data: user, message: successCodes.operationSuccessful }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorCodes.internalServerError);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, profile } = req.body;
        const hashedPassword = await hashPassword(password);
        const user: IUser = new User({
            username,
            password: hashedPassword,
            profile,
        });
        await user.save();
        res.status(201).json(successResponse({ message: successCodes.user.created }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorCodes.internalServerError);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json(successResponse({ message: successCodes.user.deleted }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorCodes.internalServerError);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
            .populate('profile')
            .populate('profile.permissions');
        if (!user || !(await comparePassword(password, user.password))) {
            return res.status(401).json(errorResponse(errorCodes.user.invalidCredentials));
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        const data = {
            accessToken,
            refreshToken,
            profile: user.profile,
            username: username,
        };
        res.json(
            successResponse({ message: successCodes.auth.loginSuccessful, data })
        );
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorCodes.internalServerError);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!user) {
            return res.status(404).json(errorResponse(errorCodes.user.notFound))
        }

        return res.status(200).json(successResponse({ message: successCodes.user.updated }))
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
}
