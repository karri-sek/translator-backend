import express from 'express';
import  bodyParser from 'body-parser';
import { loginRoute } from '../routes/loginRoute';
import { profileRoute } from '../routes/profileRoute';
import { registrationRoute } from '../routes/registrationRoute';
import { searchTranslatorRoute } from '../routes/searchTranslatorRoute';
import { messageRoute } from '../routes/messageRoute';

const Application = () => {
  const app  = express();
  app.use(bodyParser.json());
  app.use('/login', loginRoute);
  app.use('/register', registrationRoute);
  app.use('/profile', profileRoute);
  app.use('/searchTranslator',searchTranslatorRoute);
  app.use('/message',messageRoute);
  return app;
};

export default Application;