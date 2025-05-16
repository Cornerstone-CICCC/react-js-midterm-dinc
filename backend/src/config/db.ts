import mongoose from 'mongoose';
import config from './config';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected. Attempting reconnection...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected.');
  });

  mongoose.connection.on('error', (error: any) => {
    console.error(`MongoDB error: ${error}`);
  });
};