require('dotenv').config()
module.exports ={
  "development": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    port: process.env.DB_PORT || "5432",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
production: {
    username: process.env.PROD_DB_USERNAME || "root",
    password: process.env.PROD_DB_PASSWORD || "",
    database: process.env.PROD_DB_NAME || "database_production",
    host: process.env.PROD_DB_HOST , 
    port: process.env.PROD_DB_PORT,
  dialect: "postgres",
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
}
