const express = require('express')
const { registerUser, loginUser, getUser, getAllUsers, getUsersByEmailSubstring } = require('../controllers/userController')
const UserRouter = express.Router()

UserRouter.post('/register', registerUser)
UserRouter.get('/login', loginUser)
UserRouter.get('/get-user', getUser)
UserRouter.get('/find-user', getUsersByEmailSubstring)
UserRouter.get('/get-all-users', getAllUsers)

module.exports = UserRouter