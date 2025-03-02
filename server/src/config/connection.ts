import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_URL);
console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(process.env.DB_NAME ?? '', process.env.DB_USER ?? '', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

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
