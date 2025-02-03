import sequelize from "../config/database";

const testConnection = async ()  => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to PostgreSQL:", error);
  }
};

testConnection()
  .then(() => console.log("✅ PostgreSQL connection tested."))
  .catch(console.error);

export default { sequelize };
