const mysql = require('mysql2/promise');
const dbConfig = require('../configDb');

/* eslint-disable operator-linebreak */
const {
  carsFromDb,
  addNewCarDb,
  deleteCarFromDb,
  oneCarFromDb,
} = require('../models/carModel');

async function carsIndex(req, res) {
  const cars = await carsFromDb();
  if (cars === false) {
    res.status(500);
    return;
  }
  res.json(cars);
}
async function carById(req, res) {
  const { id } = req.params;
  const cars = await oneCarFromDb(id);
  if (cars.length === 0) {
    res.status(400).json('no such id');
    return;
  }
  if (cars === false) {
    res.status(500).json('problems while connecting to DATABASE');
    return;
  }
  res.json(cars);
}

async function newCarAdded(req, res) {
  const bodyData = req.body;
  console.log(bodyData);
  if (
    //checkBody(bodyData){}zemiau aprasyta funkcija ir dar return apkeist, pagal klaidos gavima
    !bodyData.title ||
    !bodyData.image ||
    !bodyData.price ||
    !bodyData.number_plates
  ) {
    // const bodyData={
    //   title: 'Isuzu',
    //   image: 'https://media.istockphoto.com/photos/black-sports-sedan-on-the-street-picture-id673295274?k=20&m=673295274&s=612x612&w=0&h=BgLeHlWJvJ8D06VP4pb6AwQbcs0td4Y-hktZn9fUtmc=',
    //   price: '20000',
    //   number_plates: 'isu299'
    // }

    //   //patikrinti ar yra tusciu lauku
    //   const values=Object.values(bodyData)
    //   const valuesBool=values.map(val=>!!val).filter(val=>val===false)
    //   console.log('valuesBool===',valuesBool)

    //   // const falseEl=valuesBool.filter(val=>val===false)
    //   // console.log('falseEl ===', falseEl);
    //   // if(valuesBool.includes(false)){
    //   //   console.log('yra neuzpildytu lauku')
    //   // }

    //   //patikrinti ar yra visi keys([title, image, price, number_plates])
    //   const mustBeKeys=['title', 'image', 'price', 'number_plates']
    // const ourKeys=Object.keys(bodyData)
    // console.log('ourKeys ===', ourKeys);
    // //patikrinam ar visi must be keys yra visi ourKeys
    // const allKeys=mustBeKeys.filter(mustKey=>ourKeys.includes(mustKey))
    // console.log('allKeys ===', allKeys);
    // if(valuesBool.length>0||allKeys.length>0){
    //   console.log('yra neuzpildytu lauku')
    // }
    // function checkBody(dataToCheck){
    //   const mustBeKeys=['title', 'image', 'price', 'number_plates']
    //   const values=Object.values(dataToCheck)
    //   const valuesBool=values.map(val=>!!val).filter(val=>val===false)
    //   const ourKeys=Object.keys(dataToCheck)
    //   const allKeys=mustBeKeys.filter(mustKey=>ourKeys.includes(mustKey))
    //   if(valuesBool.length>0||allKeys.length>0){
    //     console.log('yra neuzpildytu lauku')
    // }
    res.status(400).send('ivesti ne visi duomenys');
    console.log('uzpildykite visus privalomus laukus');
    return;
  }
  const result = await addNewCarDb(bodyData);
  if (result === false) {
    res.status(500).json('problems while connecting to DATABASE');
    return;
  }
  res.json(result);
}

async function deleteOneCar(req, res) {
  const { id } = req.params;
  const result = await deleteCarFromDb(id);
  if (result.affectedRows === 0) {
    res.status(400).json('no such id, no rows deleted');
    return;
  }
  if (!id) {
    res
      .status(400)
      .json('please indicate id of car which you want to delete from database');
    return;
  }
  if (result === false) {
    res.status(500).json('problems while connecting to DATABASE');
    return;
  }
  res.json('Delete success');
}
async function testDb(req, res) {
  try {
    const conn = await mysql.createConnection(dbConfig);
    await conn.close();
    res.json({ success: 'connected to db' });
  } catch (error) {
    res.status(500).json({ error: 'failed to connect to db' });
  }
}

module.exports = { carsIndex, newCarAdded, deleteOneCar, carById, testDb };
