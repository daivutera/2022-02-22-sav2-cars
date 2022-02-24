const res = require('express/lib/response');
const mysql = require('mysql2/promise');
const dbConfig = require('../configDb');

async function carsFromDb() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.query('SELECT * FROM cars');
    await connection.close();
    return result;
  } catch (error) {
    console.log('klaida', error);
    return false;
  }
}
async function oneCarFromDb(id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.query(
      `SELECT * FROM cars WHERE id=${id}`
    );
    await connection.close();
    return result;
  } catch (error) {
    console.log('klaida', error);
    return false;
  }
}

async function addNewCarDb(body) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const { number_plates, price, image, title } = body;
    const sql =
      'INSERT INTO cars (title, image, price, number_plates)VALUES (?,?,?,?)';
    const [data] = await connection.execute(sql, [
      title,
      image,
      price,
      number_plates,
    ]);
    await connection.close();
    return data;
  } catch (error) {
    console.log('klaida');
    return false;
  }
}
async function deleteCarFromDb(id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'DELETE FROM cars WHERE id=?';
    const [data] = await connection.execute(sql, [id]);

    await connection.close();
    return data;
  } catch (error) {
    return false;
  }
}

module.exports = {
  carsFromDb,
  addNewCarDb,
  deleteCarFromDb,
  oneCarFromDb,
};
