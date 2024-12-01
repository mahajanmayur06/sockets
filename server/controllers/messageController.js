const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");

const sendMessage = async (req, res) => {
    const { content, chatId, email } = req.body;

    try {
        console.log(content, chatId, email);

        if (!content || !chatId || !email) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const sender = await User.findOne({ email });
        const chat = await Chat.findById(chatId);
        console.log(chatId)

        const newMessage = await Message.create({
            sender: sender._id,
            content: content,
            chat: chatId,
        });

        const fullMessage = await Message.findById(newMessage._id)
            .populate("sender", "-password") 
            .populate({
                path: "chat",
                populate: {
                    path: "users", 
                    select: "name email", 
                },
            });

        chat.latestMessage = fullMessage._id;
        await chat.save();
        console.log(fullMessage)
        res.status(200).json({ fullMessage : fullMessage, message : "message sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const allMessages = async (req, res) => {
    const { chatId } = req.query
    try {
        console.log(chatId)
        const messages = await Message.find({ chat : chatId})
        .populate("sender", "name email pic")
        .populate("chat")

        console.log(messages)
        res.status(200).json(messages)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message : error.message})
    }
}

module.exports = { sendMessage, allMessages}