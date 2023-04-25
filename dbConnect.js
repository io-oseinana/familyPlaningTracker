import mysql from 'mysql'
import { config } from 'dotenv'
config()
 export const dbconnect=mysql.createConnection({
        host:"familyplanning.cbg4o5mtlacu.us-east-1.rds.amazonaws.com",
        user:"admin,
        password:"ma5t3rpass",
        database :"familyplanning",
        multipleStatements: true
    
})
 
//  import mysql from 'mysql'
// import { config } from 'dotenv'
// config()
//  export const dbconnect=mysql.createConnection({
//         host:process.env.HOST,
//         user:process.env.USER,
//         password:process.env.PASSWORD,
//         database :process.env.DATABASE,
//         multipleStatements: true
    
// })
