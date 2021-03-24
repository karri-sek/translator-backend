import express from 'express';
import {searchTranslator} from '../controllers/searchTranslator';

export const searchTranslatorRoute = express.Router();

searchTranslatorRoute.get('/', (req, res) => {
    searchTranslator(req, res);
});

export default searchTranslatorRoute;
