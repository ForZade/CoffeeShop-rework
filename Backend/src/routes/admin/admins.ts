import express, { Request, Response } from "express";
import User from "../../models/userModel"; 

const router = express.Router();

// POST /admin/ route to promote a user to administrator
router.post("/", async (req: Request, res: Response) => {
  try {
    const { identifier, userId } = req.body; // 123456 ; hello@mail.com
    
    const admin = await User.findOne({id: userId});
    
    if ( !admin.isAdmin ){
      return res.status(400).json({
        message: "User is not admin"
      });
    }

    let user;

    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ id: identifier });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.isAdmin){
      return res.status(400).json(
        {
          message: "User is already an admin"
        }
      )
    }

    if(user.isVerified === false){
      return res.status(400).json(
        {
          message: "User is not verified"
        }
      )
    }

    user.isAdmin = true;
    await user.save();

    res.json({ message: "User promoted to administrator successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /admin/ route to remove a user from administrator role
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { identifier, userId } = req.body; // 123456 ; hello@mail.com

    const admin = await User.findOne({id: userId});
    
    if ( !admin.isAdmin ){
      return res.status(400).json({
        message: "User is not admin"
      });
    }

    let user;

    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ id: identifier });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.isAdmin){
      return res.status(400).json(
        {
          message: "User is not an admin"
        }
      )
    }

    if(user.isVerified === false){
      return res.status(400).json(
        {
          message: "User is not verified"
        }
      )
    }

    user.isAdmin = false;
    await user.save();

    res.json({ message: "User removed from administrator role successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;