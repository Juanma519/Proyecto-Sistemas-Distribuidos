import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/*export const pool = new Pool({  
    
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined, 
})*/
export const pool = new Pool({  
    
    user:'usuario',
    host:'database',
    database:'MentalNow',
    password:'juancito',
    port: 5432 
})