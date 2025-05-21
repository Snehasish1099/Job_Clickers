import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendMessage = async (req, res) => {
    try {
        const { to, message } = req.body;
        const from = req.user?._id;

        if (!to || !message?.trim()) {
            return res.status(404).json(new ApiResponse(404, null, "Receiver and message are required."))
        }

        let chat = await Chat.findOne({
            participants: { $all: [from, to] },
        });

        if (!chat) {
            chat = await Chat.create({
                participants: [from, to],
                createdBy: from,
            });
        }

        const newMessage = await Message.create({
            from,
            to,
            message,
            chat: chat._id,
        });

        await Chat.findByIdAndUpdate(chat._id, {
            lastMessage: newMessage._id,
            updatedAt: new Date(),
        });

        res.status(201).json(new ApiResponse(201, newMessage, "Message sent"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message))
    }
};

export const getMessagesByChatId = async (req, res) => {
    try {
        const { chatId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.dataPerPage) || 10;
        const skip = (page - 1) * limit;

        const messages = await Message.find({ chat: chatId })
            .populate("sender", "name email phone_number")
            .populate("receiver", "name email phone_number")
            .sort({ sentAt: 1 })
            .skip(skip)
            .limit(limit);

        const total = await Message.countDocuments({ chat: chatId });

        if (!messages.length) {
            return res.status(404).json(new ApiResponse(404, null, "No messages found."))
        }

        res.status(200).json({ data: messages, total });
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const getAllChatsByUserId = async (req, res) => {
    try {
        const userId = req.user._id;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.dataPerPage) || 10;
        const skip = (page - 1) * limit;

        const chats = await Chat.find({ participants: userId })
            .populate("participants", "name email phone_number")
            .populate("lastMessage", "-createdBy")
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Chat.countDocuments({ participants: userId });

        if (!chats.length) {
            return res.status(404).json(new ApiResponse(404, null, "No messages found."));
        }

        res.status(200).json({ data: chats, total });
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
};

export const markMessagesAsRead = async (req, res) => {
    try {
        const { chatId } = req.params;

        const updated = await Message.updateMany(
            { chat: chatId },
            { $set: { readStatus: true } }
        );

        res.status(200).json({ message: "Messages marked as read." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

