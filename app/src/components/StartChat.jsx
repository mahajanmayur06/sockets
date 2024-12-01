import axios from 'axios';
import React, { useState } from 'react';

const StartChat = ({ user }) => {
    const [message, setMessage] = useState('');
    const [chatActive, setChatActive] = useState(false);

    const sendMessage = async () => {
        if (message.trim() && chatId) {
            try {
                await axios.post('http://localhost:3500/message/send-message', {
                    body: {
                        content: message,
                        email: localStorage.getItem('userData').email,
                        chatId: chatId,
                    },
                });
                setMessage(''); // Clear the message box
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    const startToChat = async (user) => {
		const res = await axios.post('http://localhost:3500/chat/access-chat', {
			senderEmail : localStorage.getItem('userData').email,
			receiverEmail : user.email
		})
		if (res.data) {
			// setChatId("674b2eed85940c8193f814cc")
			console.log(res.data);
			setSelectedUser(user)
		}
	}

    return (
        <div className="start-chat-container p-4 border rounded-lg mb-4">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            {!chatActive ? (
                <button
                    onClick={handleStartChat}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Start Chat
                </button>
            ) : (
                <div className="chat-box mt-4">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600"
                    >
                        Send Message
                    </button>
                </div>
            )}
        </div>
    );
};

export default StartChat;
