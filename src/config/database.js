import dotenv from "dotenv";
dotenv.config();

const config = {
  dialect: process.env.DATABASE_DIALECT,
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    ssl: {
      require: true, // força uso de SSL
      rejectUnauthorized: false, // equivalente a sslmode=require
    },
  },
  timezone: "America/Sao_Paulo",
};

export default config;
