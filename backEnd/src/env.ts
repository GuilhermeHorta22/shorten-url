import { config } from "dotenv";

config();

if(!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL não definido no ambiente.");

export const env = {
    DATABASE_URL: process.env.DATABASE_URL as string
}