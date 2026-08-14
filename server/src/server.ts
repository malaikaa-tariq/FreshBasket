import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const port = Number(process.env.PORT || 5000);

// Connect to MongoDB
connectDB().catch((e) => {
  console.error('Database connection failed', e);
  process.exit(1);
});

// Only listen on a port if running locally (not in Vercel serverless environment)
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`FreshBasket API running on http://localhost:${port}`);
  });
}

// Export the app for Vercel Serverless Functions
export default app;