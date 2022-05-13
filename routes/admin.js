import express from "express";
import { getDataAbsen, renderAdminPage, getAllUser, unbanUser, banUser } from "../controllers/admin.js"
import { isLogin, isAdmin } from "../middlewares/auth.js"
const router = express.Router();

router.use([isLogin, isAdmin]);

router.get("/", renderAdminPage);
router.get("/data", getDataAbsen);
router.post("/data", getDataAbsen);
router.get("/users", getAllUser);
router.get("/users/ban/:id", banUser);
router.get("/users/unban/:id", unbanUser);

export default router;