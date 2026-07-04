import mongoose, { Schema } from 'mongoose'
import User from './User.js'
import Message from './Message.js'

const chatSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: User
    },
}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)
export default Chat