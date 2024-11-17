import jwt from 'jsonwebtoken';

export const generateAccessToken = (user: any): string => {
    return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '30m' });
    // return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (user: any): string => {
    return jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};
