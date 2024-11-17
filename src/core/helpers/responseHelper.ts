type ISuccessResponse = {
    message: string;
    data?: any;
};

export const successResponse = ({ message, data }: ISuccessResponse) => {
    return {
        status: 'Success',
        message,
        data,
    };
};

export const errorResponse = (message: string) => {
    return {
        status: 'Failure',
        message,
    };
};
