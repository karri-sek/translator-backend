import express from 'express';
import {registerUser} from '../controllers/register';

export const registrationRoute = express.Router();

registrationRoute.post('/', (req, res) => {
    registerUser(req, res);
});

export default registrationRoute;
