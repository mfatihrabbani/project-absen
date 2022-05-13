import express from "express";
import { isLogin, isActive } from "../middlewares/auth.js";
import { renderAbsen, userAbsen, renderAlreadyAbsen } from "../controllers/absen.js"

const router = express.Router();

router.get("/", [isLogin, isActive], renderAbsen);
router.get("/:id", isLogin, userAbsen);

export default router;