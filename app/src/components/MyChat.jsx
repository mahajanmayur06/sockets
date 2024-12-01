import React from 'react'

const MyChat = ({ user }) => {
    const [chatId, setChatId] = useState('')

    const startToChat = async () => {
		const res = await axios.post('http://localhost:3500/chat/access-chat', {
			senderEmail : localStorage.getItem('userData').email,
			receiverEmail : user.email
		})
		if (res.data) {
			// setChatId("674b2eed85940c8193f814cc")
            setChatId(res.data._id)
			console.log(res.data);
			setSelectedUser(user)
		}
	}

    return (
        <>
            <ChatBox user = {user} />
        </>
    )
}

export default MyChat