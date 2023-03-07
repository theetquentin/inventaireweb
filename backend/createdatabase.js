import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function createDatabaseAndTable() {
  // create connection pool
    const pool = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    });

    // création de la base de données inventaire
    await pool.query('CREATE DATABASE IF NOT EXISTS inventaire');

    // on va sur la base
    await pool.query('USE inventaire');

    // création de la table ordinateurs
        await pool.query(`
        CREATE TABLE IF NOT EXISTS Ordinateurs (
        idPc VARCHAR(255),
        cpu VARCHAR(255),
        os VARCHAR(255),
        ram VARCHAR(255),
        storage_c INT(4),
        used_c INT(4),
        available_c iNT(4),
        storage_d INT(4),
        used_d INT(4),
        available_d iNT(4),
        PRIMARY KEY (idPc)
        )
    `);

    // contrainte SQL pour rendre unique l'idPc
    await pool.query(`ALTER TABLE Ordinateurs ADD CONSTRAINT unique_idPc UNIQUE (idPc);`);

    console.log('Base de données et table créées avec succès');
}

createDatabaseAndTable();

