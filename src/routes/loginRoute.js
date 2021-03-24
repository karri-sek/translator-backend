import express from 'express';
import {verifyLogin} from '../controllers/login';

export const loginRoute = express.Router();

loginRoute.post('/', (req, res) => {
    verifyLogin(req, res);
});

export default loginRoute;
