import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import Error from './components/Error';

function App() {
    const navigate = useNavigate()
    if (localStorage.getItem('userData')) {
        navigate('/chat')
    }
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;