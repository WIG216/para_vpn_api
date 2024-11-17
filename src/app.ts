import express from 'express';
import connectDB from './core/config/db';
import routes from './modules/routes';
import dotenv from 'dotenv';
import seedPermissions from './core/config/seedPermissions';
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

const uploadDir = path.join(__dirname, '..', 'uploads');

const initializeApp = async () => {
    try {
        await connectDB();
        await seedPermissions();
        app.use(express.json());
        app.use('/uploads', express.static(uploadDir));
        app.use('/api/v1', routes);
    } catch (error) {
        console.error('Error initializing app:', error);
    }
};

initializeApp();

export default app;
