import express from "express";
import userControllers from "../../controllers/userControllers";

const router = express.Router();

router.get("/", userControllers.getUsers); //retrieves the entire user list
router.get("/id/:id", userControllers.getUserById); //retrieves a user by id
router.get("/email/:email", userControllers.getUserByEmail); //retrieves a user by email

export default router;
