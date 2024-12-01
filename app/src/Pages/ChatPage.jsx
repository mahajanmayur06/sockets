import React from 'react'
import { useState } from 'react'
import SearchUser from '../components/SearchUser'
import MyChat from '../components/MyChat'

const ChatPage = () => {
    const userData = localStorage.getItem("userData")
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState('')

    return (
        <>
            <SearchUser selectedUser = {setSelectedUser}/>
            {selectedUser && <MyChat user={selectedUser}/> }
        </>
    )
}

export default ChatPage