const mysql = require('mysql2/promise');
const dbConfig = require('../configDb');

async function singleDbExecute(sql, id) {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [data] = await connection.execute(sql, [id]);
    await connection.close();
    return data;
  } catch (error) {
    console.log('klaida', error);
    return false;
  }
}
