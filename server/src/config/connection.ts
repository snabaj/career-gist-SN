import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME ?? '',
  process.env.DB_USER ?? '',
  process.env.DB_PASSWORD ?? '',
  {
    host: process.env.DB_HOST ?? '',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connection tested.");
  } catch (error) {
    console.error("❌ Unable to connect to PostgreSQL:", error);
  }
};

testConnection()
  .then(() => console.log("✅ PostgreSQL connected successfully."))
  .catch(console.error);

export default sequelize;
