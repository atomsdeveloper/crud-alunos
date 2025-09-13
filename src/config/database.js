import dotenv from "dotenv";
dotenv.config();

const url = process.env.DATABESE_URL;

const config = {
  url,
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
