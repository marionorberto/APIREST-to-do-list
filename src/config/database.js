require('dotenv').config();

module.exports = {
  dialect: 'mariadb',
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  define: {
    timestamps: true,
    underscore: true,
    underscoreAll: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
