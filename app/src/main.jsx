import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx';
import { Provider } from './components/ui/provider';
// import { ChakraProvider } from '@chakra-ui/react';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);