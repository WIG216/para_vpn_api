import { Router } from 'express';
import {
    getProfiles,
    getProfileById,
    createProfile,
    updateProfile,
    deleteProfile,
} from './profileController';
import { authGuard } from '../../core';

const router = Router();

// Public routes
router.get('/',  authGuard(['VIEW_USER', 'CREATE_USER']), getProfiles);
router.get('/:id',  authGuard('VIEW_PROFILE'), getProfileById);

// Protected routes
router.post('/',  authGuard('CREATE_PROFILE'), createProfile);
router.put('/:id',  authGuard('UPDATE_PROFILE'), updateProfile);
router.delete('/:id',  authGuard('DELETE_PROFILE'), deleteProfile);

export default router;
