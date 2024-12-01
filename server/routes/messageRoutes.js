const express = require('express');
const { sendMessage, allMessages } = require('../controllers/messageController');
const messageRouter = express.Router()

messageRouter.post('/send-message', sendMessage)
messageRouter.get('/all-messages', allMessages)

module.exports = messageRouter;