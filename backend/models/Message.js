import mongoose from "mongoose";
import User from "./User.js";
import Chat from "./Chat.js";

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User, 
        required: true
    },
    message: {
        type: String,
        required: true
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
    },
    sentAt: {
        type: Number,
        default: Date.now,
    },
    readStatus: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema)
export default Message