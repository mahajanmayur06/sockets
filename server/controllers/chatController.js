const Chat = require("../models/Chat")
const User = require("../models/User")

const accessChats = async (req, res) => {
    const { senderEmail, receiverEmail } = req.body
    try {
        const sender = await User.findOne({ email : senderEmail })
        const receiver = await User.findOne({ email : receiverEmail})
        if (!sender || !receiver) {
            res.status(404).json({ message : `User with ${senderEmail} doesnt exist`})
        }
        let chat = await Chat.findOne({
            isGroupChat : false,
            users : { $all: [sender._id, receiver._id]}
        }).populate(("users")).populate("latestMessage")

        if (!chat) {
            chatData = {
                chatName : "one-to-one-chat",
                isGroupChat : "false",
                users : [sender._id, receiver._id]
            }
            chat = await Chat.create(chatData)
            chat = await Chat.findById(chat._id).populate("users", "-password")
        }
        console.log(receiver)
        console.log(sender)
        console.log(chat)
        res.status(200).json(chat)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message : err.message})
    }
}

const fetchChats = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email : email})
        const chats = await Chat.find({ users : user._id})
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage')
        .sort({'latestMessage.createdAt' : -1})
        console.log(chats)
        res.status(200).json({ message : 'fetched chats', chats})
    }
    catch (error){
        console.log(error)
        res.status(500).json({ message : error.message})
    }
}

const createGroupChat = async (req, res) => {
    const { email, friendEmails, chatName } = req.body;

    try {
        console.log(email, friendEmails, chatName);

        const admin = await User.findOne({ email: email });
        admin.isAdmin = true
        await admin.save()
        const friends = await User.find({ email: { $in: friendEmails } });

        if (friends.length !== friendEmails.length) {
            return res
                .status(404)
                .json({ message: "One or more provided emails do not belong to a valid user" });
        }

        const users = [...friends.map((friend) => friend._id), admin._id];
        const groupData = {
            chatName: chatName,
            isGroupChat: true,
            users: users,
            groupAdmin: [admin._id],
        };

        // Create the group chat
        const group = await Chat.create(groupData);

        // Populate the created group with users and admin details
        const populatedGroup = await Chat.findById(group._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        console.log(populatedGroup)

        res.status(200).json({
            message: "Group chat created",
            group: populatedGroup,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


const addUserToGroup = async (req, res) => {
    const { chatId, email, userId } = req.body
    try {
        const userToAdd = await User.findOne({ email : email})
        if (!userToAdd) {
            res.status(404).json({ message : 'Your friend\'s data not found, kindly join us...'})
        }

        const chat = await Chat.findById(chatId);
        if (!chat.groupAdmin.some(admin => admin.equals(userId))) {
            return res.status(403).json({ message: 'You are not authorized to add/remove anyone' });
        }
        // const chat = await Chat.findById(chatId)
        // if (chat.users.includes(user)) {
        //     res.status(400).json({ message : "user already in the chat"})
        // }

        // chat.users.push(user._id)
        // await chat.save()
        // const updatedChat = await Chat.findById(chatId).populate("users", "-password").populate("admin", "-password")
        
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { users: userToAdd._id } }, 
            { new: true }
        ).populate("users", "-password").populate("groupAdmin", "-password");
        console.log(updatedChat)
        res.status(200).json({ message : "user added to the group"})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message : error.message})
    }
}

const removeUserFromGroup = async (req, res) => {
    const { email, chatId, userId} = req.body;
    try {
        const userToRemove = await User.findOne({email : email})
        const chat = await Chat.findById(chatId);
        if (!chat.groupAdmin.some(admin => admin.equals(userId))) {
            return res.status(403).json({ message: 'You are not authorized to add/remove anyone' });
        }
        
        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { users: userToRemove._id } }, // MongoDB $pull operator removes the user ID from the array
            { new: true } // Return the updated document
        )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        console.log(updatedChat)
        res.status(200).json({ message : "user removed from the group"})
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message : error.message})
    }
}

const makeUserAdmin = async (req, res) => {
    const { chatId, email} = req.body

    try {
        
        const user = await User.findOne({ email : email})
        user.isAdmin = true
        await user.save()
        const updatedChatGroup = await Chat.findByIdAndUpdate(chatId,
            { $push : { groupAdmin : user._id} },
            { new : true}
        ).populate("groupAdmin", "-password")
        console.log(updatedChatGroup)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message : error.message})
    }
}
module.exports = { accessChats, fetchChats, createGroupChat, addUserToGroup, removeUserFromGroup, makeUserAdmin}