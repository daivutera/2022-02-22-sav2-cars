const mysql = require('mysql2/promise');
const dbConfig = require('../configDb');

async function checkConnection() {
  try {
    const conn = await mysql.createConnection(dbConfig);
    console.log('Connected to DB');
    await conn.close();
  } catch (error) {
    console.log('Error connecting to db');
    console.log('checkConnection ===', error);
  }
}

module.exports = checkConnection;
