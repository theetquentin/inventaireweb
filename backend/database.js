import mysql from 'mysql2'
import { getEnabledCategories } from 'trace_events'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getInventaire() {
    const result = await pool.query("SELECT * FROM composants")
    const rows = result[0]
    return rows[0]
}

export async function getInventaireParId(id){
    const result = await pool.query("SELECT * FROM composants WHERE composants.id= ?", [id])
    const rows = result[0]
    return rows[0]
}


// export async function getMot(id){
//     const result = await pool.query("SELECT * FROM motus.word WHERE id_word= ?", [id])
//     const rows = result[0]
//     return rows
// }

