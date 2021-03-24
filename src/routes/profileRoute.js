import express from "express";
import  multer  from 'multer';

import { getProfile,uploadToFirebase, updateProfile } from "../controllers/profile";

const myMulter = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

export const profileRoute = express.Router();

profileRoute.post("/", (req, res) => {
  getProfile(req, res);
});

profileRoute.post('/image/upload',myMulter.single('file'),async function(req, res, next) {
 const url = await uploadToFirebase(req.file);
  if(!req.file) {
    res.status(500);
    return next(err);
  }
  console.log(" url ",url);
  res.json({ fileUrl: url});
});

profileRoute.post('/updateProfile', async (req, res) => {
  console.log( " request body ", req.body);
 const response =  await updateProfile(req, res);
 return response;
});


export default profileRoute;