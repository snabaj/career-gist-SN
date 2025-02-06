import express, { Application } from 'express';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import jobRoutes from './routes/jobsRoutes.js';
import gptAPIRouter from './routes/api/gptRoutes.js';
import favoriteRoutes from './routes/favorites.js';
import jSearchRoutes, {fetchJobs} from './services/jSearchServices.js';
import sequelize from './config/connection.js';
import JobModel from './models/JobModel.js'; // ✅ Explicitly import JobModel

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(logger);

// ✅ Register Routes
app.use(fetchJobs)
app.use('/api/jobs', jobRoutes);
app.use('/api/gpt', gptAPIRouter);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/jsearch', jSearchRoutes);



app.use(errorHandler);

// ✅ Ensure JobModel is recognized before syncing the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established.");

    // ✅ Explicitly sync JobModel
    await JobModel.sync();  // 🔥 This ensures Sequelize loads the model before the app starts.

    console.log("✅ JobModel synced successfully.");

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database sync failed:", error);
    process.exit(1); // Exit if database connection fails
  }
})();
