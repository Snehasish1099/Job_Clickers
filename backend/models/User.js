import { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["jobseeker", "employer", "admin"], required: true }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;