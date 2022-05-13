import express from "express";
import { getUserById, updateUserById, renderProfileUpdate } from "../controllers/profile.js"
import { isLogin, isAdmin, } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", isLogin, getUserById);
router.get("/update", isLogin, renderProfileUpdate);
router.post("/update", isLogin, updateUserById);

export default router;