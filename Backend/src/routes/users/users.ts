import express from "express";
// import mongoose from "mongoose";
import Users from "../../models/userModel";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const users = await Users.find(); 
        res.status(200).json(users);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/id/:id", async (req, res) => {
    try {
        const getUserId = await Users.findOne({ id: parseInt(req.params.id) });
        
        if (!getUserId) {
            return res.status(404).json({
                status: "error",
                message: "User ID not found"
            });
        }
        
        res.status(200).json({
            status: "success",
            message: "User retrieved by ID successfully",
            data: getUserId
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Input a proper ID"
        });
    }
});

router.get("/email/:email", async (req, res) => {
    try {
        const getUserEmail = await Users.findOne({ email: req.params.email });
        
        if (!getUserEmail) {
            return res.status(404).json({
                status: "error",
                message: "User email not found"
            });
        }
        
        res.status(200).json({
            status: "success",
            message: "User retrieved by email successfully",
            data: getUserEmail
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: "Input a proper email"
        });
    }
});



export default router;