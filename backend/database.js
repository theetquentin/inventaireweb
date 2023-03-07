import mysql from 'mysql2'
import { getEnabledCategories } from 'trace_events'

import dotenv from 'dotenv'
dotenv.config()


const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
  // port: process.env.MYSQL_PORT
}).promise()


// export async function getInventaire() {
//     const result = await pool.query("SELECT * FROM composants")
//     const rows = result[0]
//     return rows[0]
// }

export async function ajoutOrdi(idPc, cpu, os, ram, storage_c, used_c, available_c, storage_d, used_d, available_d) {
  try {
    const result = await pool.query(
      "INSERT INTO Ordinateurs (idPc, cpu, os, ram, storage_c, used_c, available_c, storage_d, used_d, available_d) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [idPc, cpu, os, ram, storage_c, used_c, available_c, storage_d, used_d, available_d]
    );
    console.log(`Ajout d'un nouvel ordinateur avec l'ID ${idPc}`);
  } catch (error) {
    // Vérifie s'il y a une erreur de duplication d'id ou non 
    if (error.code === 'ER_DUP_ENTRY') {
      console.error(`Erreur de duplication : ${error.message}`);
      throw new Error(`Doublon pour l'ID : ${idPc}`);
    } else {
      // Si ce n'est pas une erreur de duplication, on relance l'autre erreur.
      console.error(`Erreur lors de l'ajout d'un ordinateur: ${error.message}`);
      throw error;
    }
  }
}



export async function getInventaire() {
  const result = await pool.query("SELECT * FROM ordinateurs")
  const rows = result[0]
  return rows[0]
}

// export async function getInventaireParId(id){
//     const result = await pool.query("SELECT * FROM composants WHERE composants.id= ?", [id])
//     const rows = result[0]
//     return rows[0]
// }


// export async function getMot(id){
//     const result = await pool.query("SELECT * FROM motus.word WHERE id_word= ?", [id])
//     const rows = result[0]
//     return rows
// }

