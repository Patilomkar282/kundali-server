require('dotenv').config();
console.log('MongoDB URI:', process.env.MONGODB_URI);
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');



const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Kundali API' });
});

// Routes
try {
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
  
} catch (error) {
  console.log('Routes not fully implemented yet:', error.message);
}

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});