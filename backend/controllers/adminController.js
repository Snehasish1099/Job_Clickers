import User from "../models/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";


// Get all jobseekers & employers
export async function getAllUsers(req, res) {
  try {
    const users = await User.find({ role: { $in: ["jobseeker", "employer"] } }).select("-password");
    if (!users.length) {
      return res.status(404).json(new ApiResponse(404, null, "No users found"))
    }
    res.status(200).json(new ApiResponse(200, users, "Users found"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, error.message));
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
