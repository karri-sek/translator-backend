import express from 'express';
import {receiveMessage} from '../controllers/message';

export const messageRoute = express.Router();

messageRoute.post('/sendMessage', (req, res) => {
    receiveMessage(req, res);
});

export default messageRoute;
