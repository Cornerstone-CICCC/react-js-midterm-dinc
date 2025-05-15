import app from './app';
import config from './config/config';
import { connectDB } from './config/db';

const main = async () => {
  // Connect to MongoDB
  await connectDB();
  console.log('Connected to MongoDB');

  // Run the server
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
};

main().catch((error) => {
  console.error('Error starting the server:', error);
  process.exit(1);
});
