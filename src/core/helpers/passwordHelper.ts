import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

export const comparePassword = async (
    password: string,
    hashedPassword: string
) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};
