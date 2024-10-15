import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({  
    
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5433, //esto hay q arreglarlo dsp
})
