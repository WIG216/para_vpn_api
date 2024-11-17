import { Request, Response } from 'express';
import Permission from './permissionModel';
import { errorCodes, errorResponse, logger, successCodes, successResponse } from '../../core';

export const createPermission = async (req: any) => {
    const existingPermission = await Permission.findOne({
        title: req.title,
      });
    
      if (existingPermission) {
        throw new Error('Permission already exists');
      }
    
      const permission = new Permission(req);
      return permission.save();
}

export const getPermissions = async (req: Request, res: Response) => {
    try {
        const permissions = await Permission.find();
        res.json(
            successResponse({
                message: successCodes.operationSuccessful,
                data: permissions,
            })
        );
    } catch (error) {
        console.log(error);
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
};

export const getPermissionById = async (req: Request, res: Response) => {
    try {
        const permission = await Permission.findById(req.params.id);
        console.log(permission);
        if (!permission) {
            return res
                .status(404)
                .json(errorResponse(errorCodes.permission.notFound));
        }
        res.json(
            successResponse({
                message: successCodes.operationSuccessful,
                data: permission,
            })
        );
    } catch (error:any) {
        logger.error(error.message);
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
};
