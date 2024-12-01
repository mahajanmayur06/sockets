const express = require('express')
const { 
    createGroupChat, 
    accessChats, 
    fetchChats, 
    addUserToGroup, 
    removeUserFromGroup, 
    makeUserAdmin 
} = require('../controllers/chatController')
const chatRouter = express.Router()

chatRouter.get('/fetch-chat', fetchChats)
chatRouter.post('/access-chat', accessChats)
chatRouter.post('/create-new-group', createGroupChat)
chatRouter.patch('/add-user-to-group', addUserToGroup)
chatRouter.patch('/remove-user-from-group', removeUserFromGroup)
chatRouter.patch('/make-admin', makeUserAdmin)

module.exports = chatRouter