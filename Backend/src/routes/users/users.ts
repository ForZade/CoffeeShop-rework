import express from "express";
import userControllers from "../../controllers/userControllers";
import { isAdmin } from "../../middlewares/checkRoles";

const router = express.Router();

router.get("/", userControllers.getUsers); //retrieves the entire user list
router.get("/id/:id", userControllers.getUserById); //retrieves a user by id
router.get("/email/:email", userControllers.getUserByEmail); //retrieves a user by email
router.post("/admin", isAdmin, userControllers.addAdmin);
router.delete("/admin", isAdmin, userControllers.removeAdmin);

export default router;
