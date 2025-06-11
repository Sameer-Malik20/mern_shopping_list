import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from './config/index.js';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';

// routes
import authRoutes from './routes/api/auth.js';
import itemRoutes from './routes/api/items.js';
import userRoutes from './routes/api/users.js';

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();
app.use(cookieParser());
// CORS Middleware
app.use(
  cors({
    origin: 'http://localhost:3000', // trailing slash mat lagayein
    credentials: true,
  })
);
// Logger Middleware
app.use(morgan('dev'));
// Bodyparser Middleware
app.use(bodyParser.json());

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

<<<<<<< HEAD
// ES module compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

=======
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
>>>>>>> 3f70bda6da8f44feb2b39d93a9503c19e7312a76
// Use Routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
