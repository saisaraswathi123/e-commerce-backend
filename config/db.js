const { Sequelize } = require("sequelize");
require("dotenv").config();

// Track current route for SQL logging
let currentRoute = "";
function setCurrentRoute(route) {
  currentRoute = route;
}

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Username
  process.env.DB_PASS,     // Password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // for AWS self-signed certs
      },
    },
  }
);

// Test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
    return true;
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
    return false;
  }
}

module.exports = {
  sequelize,
  testConnection,
  setCurrentRoute
};