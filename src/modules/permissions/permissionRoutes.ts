import { Router } from 'express';
import { getPermissionById, getPermissions } from './permissionController';
import { authGuard, validateObjectId } from '../../core';

const router = Router();
router.use(authGuard)
router.use('/:id', validateObjectId);

// Public routes
router.get('/', getPermissions);
router.get('/:id', getPermissionById);

export default router;
