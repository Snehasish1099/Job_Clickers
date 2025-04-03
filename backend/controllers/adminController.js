import User from "../models/User.js";

// Get all jobseekers & employers
export async function getAllUsers(req, res) {
  try {
    const users = await User.find({ role: { $in: ["jobseeker", "employer"] } }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a user
export async function deleteUser(req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
