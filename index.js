import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import router from './routes/routes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB()
    .then(res => console.info(res))
    .catch(err => console.error("Error: Connection to database not established!"))

// Create Express application
const app = express();

// Set port from environment variable, defaulting to 5000 if not provided
const PORT = 5000;

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Mount router at root path
app.use("/", router);

// Start server and listen on specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
