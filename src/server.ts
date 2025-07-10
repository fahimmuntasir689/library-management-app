import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const port = 3000;

const uri = process.env.MONGO_URI as string;


async function startAPPServer() {
  try {
    if (!uri) {
      throw new Error('MONGO_URI is missing in environment variables');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

startAPPServer();