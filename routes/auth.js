import express from "express";
import { validateLogin, renderLogin, registerUser, renderRegister, logoutUser } from "../controllers/auth.js"
import { renderAlreadyAbsen } from "../controllers/absen.js"


const router = express.Router();

router.get("/login", renderLogin);
router.post("/login", validateLogin);
router.post("/register", registerUser);
router.get("/register", renderRegister);
router.get("/logout", logoutUser);
router.get("/true", renderAlreadyAbsen);

export default router;



