import express, { Application } from 'express';
import dotenv from 'dotenv';
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import routes from './routes/index.js';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

app.use(express.json());
app.use(logger);

app.use(routes);

app.use(errorHandler);

app.listen(PORT, (): void => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
