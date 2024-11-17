import { Router } from 'express';
import userRoutes from './user/userRoutes';
import profileRoutes from './profile/profileRoute';
import permissionRoutes from './permissions/permissionRoutes';
import serverRoutes from './server/serverRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/profiles', profileRoutes);
router.use('/permissions', permissionRoutes);
router.use('/permissions', permissionRoutes);
router.use('/servers', serverRoutes);

export default router;
