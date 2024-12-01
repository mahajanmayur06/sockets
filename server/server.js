const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); 
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const credentials = require('./middlewares/credentials');
const messageRouter = require('./routes/messageRoutes');
const UserRouter = require('./routes/userRoutes');
const chatRouter = require('./routes/chatRoutes');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO Server
const io = new Server(server, {
    cors: {
        origin: "*", // You can replace * with specific origins for security
        methods: ["GET", "PATCH", "POST", "DELETE"]
    }
});

connectDB();

// Middlewares
// app.use(credentials());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/user', UserRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

// Socket.IO Event Handling
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('message', (data) => {
        console.log(`Message from ${socket.id}: ${data}`);
        io.emit('message', data); // Broadcast to all connected clients
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
