import User from "../models/userModel";

export async function isAdmin(id) { 
    const user: any = User.findOne({ id });
    return user.isAdmin 
}