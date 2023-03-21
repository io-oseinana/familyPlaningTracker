import mysql from 'mysql'
import { config } from 'dotenv'
config()
 export const dbconnect=mysql.createConnection({
        host:process.env.HOST,
        user:process.env.USER,
        password:process.env.PASSWORD,
        database :process.env.DATABASE,
        multipleStatements: true
    
})