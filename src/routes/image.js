import express from "express";
import { getProfile } from "../controllers/profile";

export const imageRoute = express.Router();

imageRoute.post("/", (req, res) => {
  getProfile(req, res);
});

export default imageRoute;