import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Server from './serverModel';
import { errorCodes, errorResponse, logger, successCodes, successResponse } from '../../core';

export const createServer = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json(errorResponse(errorCodes.server.noImage));
        }

        // const creator = req.user;
        // if (!creator) {
        //     return res.status(403).json(errorResponse(errorCodes.unauthorized));
        // }

        const existingServer = await Server.findOne({ name: req.body.name });
        if (existingServer) {
            return res.status(400).json(errorResponse(errorCodes.server.nameExists));
        }

        const imageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;

        const server = new Server({
            name: req.body.name,
            image: imageUrl,
            creator: "6737db9ca2a9ccb836934517",
            // creator: creator._id,
        });

        await server.save();

        res.status(201).json(successResponse({ message: successCodes.server.created }));
    } catch (error: any) {
        logger.error(error.message);
        res.status(500).json(errorResponse(errorCodes.internalServerError));
        ;
    }
};

export const getServers = async (req: Request, res: Response) => {
    try {
        const servers = await Server.find().populate('creator', 'name email');
        res.status(200).json(successResponse({ data: servers, message: successCodes.operationSuccessful }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
        ;
    }
};

export const getServerById = async (req: Request, res: Response) => {
    try {
        const server = await Server.findById(req.params.id).populate('creator', 'username password');
        if (!server) {
            return res.status(404).json(errorResponse(errorCodes.user.notFound));
        }
        res.status(200).json(successResponse({ data: server, message: successCodes.operationSuccessful }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
        ;
    }
};

export const getServersByCreator = async (req: Request, res: Response) => {
    try {
        const creatorId = req.params.creatorId || req.user?._id;

        if (!creatorId) {
            res.status(400).json({ message: 'Creator ID is required' });
        }

        const servers = await Server.find({ creator: creatorId })
            .populate('creator', 'name email')

        if (servers.length === 0) {
            res.status(404).json({ message: 'No servers found for this creator' });
        }

        res.status(200).json(servers);
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
        ;
    }
};

export const updateServer = async (req: Request, res: Response) => {
    try {
        const server = await Server.findById(req.params.id);
        if (!server) {
            return res.status(404).json(errorResponse(errorCodes.server.notFound))
        }

        if (req.file) {
            const newImageUrl = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
            const file = path.basename(server.image)
            const oldImagePath = path.join(__dirname, '..', '..', '..', 'uploads', file);

            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            server.image = newImageUrl;
        }

        if (req.body.name) {
            server.name = req.body.name;
        }

        await server.save();
        return res.status(200).json(successResponse({ message: successCodes.server.updated }))
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
        
    }
};

// Delete a server by ID
export const deleteServer = async (req: Request, res: Response) => {
    try {
        const server = await Server.findById(req.params.id);
        if (!server) {
            return res.status(404).json(errorResponse(errorCodes.server.notFound))
            return;
        }

        const imagePath = path.join(__dirname, '../', server.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await server.deleteOne();
        res.status(200).json(successResponse({ message: successCodes.server.deleted }));
    } catch (error: any) {
        logger.error(error.message)
        res.status(500).json(errorResponse(errorCodes.internalServerError));
        ;
    }
};
