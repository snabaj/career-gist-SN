import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import sequelize from './config/connection.js';
import JobModel from './models/JobQueryModel.js';

dotenv.config();



const app: Application = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());
app.use('/api', routes);
app.use(express.static('../client/dist'));

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established.");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
  try {
    await JobModel.sync();
    console.log("✅ JobModel synced successfully.");
  } catch (error) {
    console.error("❌ JobModel sync failed:", error);
  }
  try {
    await sequelize.sync();
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("❌ Database sync failed:", error);
  }
  try {
    app.listen(PORT, () => {
      console.log(`✅Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database sync failed:", error);
    process.exit(1);
  }
})();

