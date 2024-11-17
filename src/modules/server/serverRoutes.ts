import { Router } from 'express';
import { authGuard, refreshToken, upload, validateObjectId, validateSchema } from '../../core';
import { createServer, deleteServer, getServerById, getServers, getServersByCreator, updateServer } from './serverController';

const router = Router();

router.post('/',upload, createServer);

router.get('/', getServers);

router.get('/:id', getServerById);

router.get('/creator/:creatorId', getServersByCreator);

router.patch('/:id', upload, updateServer);

router.delete('/:id', deleteServer);
// router.post('/',authGuard('VIEW_SERVER'),upload, createServer);

// router.get('/',authGuard('VIEW_SERVER'), getServers);

// router.get('/:id',authGuard('VIEW_SERVER'), getServerById);

// router.get('/creator/:creatorId', authGuard('VIEW_SERVER'), getServersByCreator);

// router.patch('/:id',authGuard('UPDATE_SERVER'), upload, updateServer);

// router.delete('/:id',authGuard('DELETE_SERVER'), deleteServer);

export default router;