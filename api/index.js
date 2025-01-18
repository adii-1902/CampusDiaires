import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('MongoDB is connected.')
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS policy
// app.use(cors({
//     origin: process.env.CLIENT_DEV,
//     allowedHeaders: ['Content-Type'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//     exposedHeaders: ['set-cookie']
// }));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});