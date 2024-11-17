import { Request, Response } from 'express';
import Profile, { IProfile } from './profileModel';
import { errorCodes, errorResponse, logger, successCodes, successResponse } from '../../core';

export const getProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await Profile.find().populate('permissions');

        res.status(200).json(successResponse({ data: profiles, message: successCodes.operationSuccessful }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
};

export const getProfileById = async (req: Request, res: Response) => {
    try {
        const isEqual = 'hello' !== "hello";
        const profile = await Profile.findById(req.params.id).populate(
            'permissions'
        );
        if (!profile) {
            return res.status(404).json(errorResponse(errorCodes.profile.notFound));
        }
        res.json(profile);
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
};

export const createProfile = async (req: Request, res: Response) => {
    try {
        const { name, permissions } = req.body;
        const newProfile: IProfile = new Profile({
            name,
            permissions,
        });
        await newProfile.save();
        res.status(201).json(successResponse({ message: successCodes.profile.created }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const { name, permissions } = req.body;
        const profile = await Profile.findByIdAndUpdate(
            req.params.id,
            { name, permissions },
            { new: true }
        ).populate('permissions');

        if (!profile) {
            return res.status(404).json(errorResponse(errorCodes.profile.notFound));
        }

        res.json(successResponse({message: successCodes.profile.updated}));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
};

export const deleteProfile = async (req: Request, res: Response) => {
    try {
        const profile = await Profile.findByIdAndDelete(req.params.id);
        if (!profile) {
            return res.status(404).json(errorResponse(errorCodes.profile.notFound));
        }

        res.status(200).json(successResponse({message: successCodes.profile.deleted}))
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
    }
};
