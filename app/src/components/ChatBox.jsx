import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChatBox = ( { user, chatId}) => {
    const [messages, setMessages] = useState([])
    const senderUser = JSON.parse(localStorage.getItem('userData'))

    useEffect( () => {
        try {
            const fetchMessages = async () => {
                const res = await axios.get('http://localhost:3500/message/all-messages', {
                    query : { chatId : chatId}
                })
                setMessages(res.data.content)
            }
            console.log(messages) 
        }
        catch (err) {
            
        }
    }, [])
    return (
        <>
            
        </>
    )
}

export default ChatBox