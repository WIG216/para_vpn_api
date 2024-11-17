import mongoose from 'mongoose';
import Permission from '../../modules/permissions/permissionModel';
import Profile from '../../modules/profile/profileModel';
import User from '../../modules/user/userModel';
import defaultPermissions from '../../modules/permissions/permissions';
import { hashPassword } from '../helpers/passwordHelper';
import { createPermission } from '../../modules/permissions/permissionController';

const seedPermissions = async () => {
    try {
        for (const permission of defaultPermissions) {
            let existingPermission = await Permission.findOne({
                title: permission.title,
            });

            if (!existingPermission) {
                await createPermission(permission);
            }
        }

        const permissionIds = (await Permission.find()).map(
            (permission: any) => permission._id,
        );

        const adminProfile = await Profile.findOneAndUpdate(
            { title: 'Admin Profile' },
            {
                title: 'Admin Profile',
                description: 'admin profile description',
                permissions: permissionIds,
            },
            { upsert: true, new: true },
        );

        const hashedPassword = await hashPassword("0000");

        await User.findOneAndUpdate(
            { username: 'admin' },
            {
                username: 'admin',
                password: hashedPassword,
                profile: adminProfile._id,
            },
            { upsert: true, new: true },
        );

    } catch (error) {
        console.error('Error seeding permissions:', error);
        mongoose.connection.close();
    }
};

export default seedPermissions;
