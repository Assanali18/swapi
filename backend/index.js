import express from 'express';
import mongoose from 'mongoose';
import planetsRouter from './routes/planet.js';
import personRouter from './routes/person.js';
import starshipRouter from './routes/starship.js';
import searchRouter from './routes/search.js';
import cors from 'cors';

import {registerValidation} from './validations/auth.js';

import isAuth from './utils/isAuth.js';

import * as UserController from './controllers/UserController.js'



const app = express();
const PORT = process.env.PORT || 4444;

const MONGO_URI = 'mongodb://127.0.0.1:27017';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cors());

app.use('/api/planets', planetsRouter);
app.use('/api/people', personRouter);
app.use('/api/starships', starshipRouter);
app.use('/api/search', searchRouter);



app.post('/auth/login', UserController.login);
app.post('/auth/register',registerValidation, UserController.register);
app.get('/auth/me', isAuth, UserController.getMe);    