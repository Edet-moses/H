import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://edetmoses213:mYaBAePZMxuk35ev@cluster0.ohztd28.mongodb.net/"
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB', error);
    throw error;
  }
}

export default connectDB;