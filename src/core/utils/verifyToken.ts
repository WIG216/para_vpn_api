import jwt from 'jsonwebtoken';

export const verifyAccessToken = (token: string): any => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
};

export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
};
