import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StartChat from './StartChat';

const SearchUser = ({ selectedUser, setSelectedUser }) => {
	const [users, setUsers] = useState([])
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	// const [chatId, setChatId] = useState('')

	const senderUser = JSON.parse(localStorage.getItem("userData"))
	
  	const handleSearchChange = async (e) => {
		const email = e.target.value;
		setSearchTerm(email);
		setLoading(true);
		console.log(searchTerm)
		// setUsers(["user1", "user2", "user3"]);
		try {
			if (email.length > 0) {
				const response = await axios.get('http://localhost:3500/user/find-user', { 
					params : { searchTerm : email }
				});
				const resultantUsers = response.data;
				const filteredUsers = resultantUsers.filter((resultantUser) => resultantUser._id !== senderUser._id)
				setUsers(filteredUsers); // Set the fetched users
				setError('');
			}
		} 
		catch (err) {
			setError('Failed to fetch users.');
		} 
		finally {
			// setUsers([])
			setLoading(false);
    	}
	};

	const startToChat = async (user) => {
		console.log(user.email)
		console.log(senderUser.email)
		const res = await axios.post('http://localhost:3500/chat/access-chat', {
			senderEmail : senderUser.email,
			receiverEmail : user.email
		})
		if (res.data) {
			setChatId(res.data._id)
			console.log(res.data);
			setSelectedUser(user)
		}
	}
	useEffect (() => {
		handleSearchChange()
	}, [searchTerm])

return (
    <div className="search-container p-4 max-w-lg mx-auto">
		<input
			type="text"
			value={searchTerm}
			onChange={handleSearchChange}
			placeholder="Search for users..."
			className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
		/>
		
		{loading && <p>Loading...</p>}
		{error && <p className="text-red-500">{error}</p>}
		{users.length > 0 && searchTerm && (
			<ul>
				{users.map((user, index) => (
					<li key={index}>
						<span>
							<button onClick={() => startToChat(user)}>{user.name}</button>
						</span> 
					</li>
				))}
			</ul>
        )}

		
		</div>
	);
};

export default SearchUser;
