import express, { Application } from 'express';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import {userRouter} from "./routes/api/userRoutes";
import gptAPIRouter from './routes/api/gptRoutes.js';
import favoriteRoutes from './routes/favorites.js';
import jSearchRoutes from './routes/api/jSearchRoutes.js';
import sequelize from './config/connection.js';
import JobModel from './models/JobModel.js';


dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(logger);
app.use(errorHandler);
app.use('/api/users', userRouter);
app.use('/api/gpt', gptAPIRouter);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/jsearch', jSearchRoutes);


(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established.");

    await JobModel.sync();

    console.log("✅ JobModel synced successfully.");

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database sync failed:", error);
    process.exit(1);
  }
})();
