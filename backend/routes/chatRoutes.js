import express from 'express';
import { sendMessage, getMessagesByChatId, getAllChatsByUserId, markMessagesAsRead } from '../controllers/chatController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/send/message', authMiddleware, sendMessage);
router.get('/messages/:chatId', authMiddleware, getMessagesByChatId);
router.get('/all', authMiddleware, getAllChatsByUserId);

router.patch('/read/:chatId', authMiddleware, markMessagesAsRead);

export default router;
