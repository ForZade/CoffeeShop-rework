import User from "../models/userModel";

export async function generateUserId() {
  const id = Math.floor(10000000 + Math.random() * 90000000).toString();

  const existingUser = await User.findOne({ id: id });

  if (existingUser) {
    return generateUserId();
  }

  return id;
}
