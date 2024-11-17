import { Router } from 'express';
import { getUsers, createUser, deleteUser, loginUser, getUserById, updateUser } from './userController';
import { userLoginSchema } from './userValidator';
import { authGuard, refreshToken, validateObjectId, validateSchema } from '../../core';

const router = Router();

router.post('/login', validateSchema(userLoginSchema), loginUser);
router.post('/refresh-token/:token', refreshToken);

router.get('/', authGuard('VIEW_USER'), getUsers);
router.post('/', authGuard('CREATE_USER'), createUser);

// router.use(validateObjectId)
router.get('/:id', authGuard('VIEW_USER'), getUserById);
router.patch('/:id', authGuard('VIEW_USER'), updateUser);
router.delete('/:id', authGuard('DELETE_USER'), deleteUser);

export default router;