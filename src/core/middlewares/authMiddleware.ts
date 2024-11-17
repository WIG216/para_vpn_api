import { Request, Response, NextFunction } from 'express';
import { errorResponse, successResponse } from '../helpers';
import User from '../../modules/user/userModel';
import { errorCodes, successCodes } from '../constants';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from '../utils';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

export const authGuard = (permission: string | string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                return res.status(401).json(errorResponse(errorCodes.auth.tokenMissing));
            }

            const decoded = verifyAccessToken(token)

            const user = await User.findById(decoded.id)
                .populate({
                    path: 'profile',
                    populate: { path: 'permissions' }
                });

            if (!user) {
                return res.status(401).json(errorResponse(errorCodes.unauthorized));
            }

            req.user = user;

            const userPermissions = req.user.profile.permissions.map((p: any) => p.title);
            const hasPermission =
                typeof permission === 'string'
                    ? userPermissions.includes(permission)
                    : permission.every((item) => userPermissions.includes(item));

            if (!hasPermission) {
                return res.status(403).json(errorResponse(errorCodes.forbidden));
            }

            next();
        } catch (error) {
            return res.status(401).json(errorResponse(errorCodes.unauthorized));
        }
    };
};

export const refreshToken = (req: Request, res: Response) => {
    try {
        const refreshToken = req.params.token;
        if (!refreshToken) {
            res.status(403).json(errorResponse(errorCodes.auth.refreshTokenMissing));
        }
        const decoded = verifyRefreshToken(refreshToken);
        const accessToken = generateAccessToken(decoded);

        return res.json(successResponse({ message: successCodes.auth.accessTokenRegenerated, data: { accessToken } }));

    } catch (error) {
        return res.status(403).json(errorResponse(errorCodes.auth.invalidRefreshToken));
    }
};
