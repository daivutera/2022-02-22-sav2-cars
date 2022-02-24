const express = require('express');
const {
  carsIndex,
  newCarAdded,
  deleteOneCar,
  carById,
  testDb,
} = require('../controllers/carController');
const router = express.Router();

router.get('/cars', carsIndex);
router.post('/cars', newCarAdded);
router.delete('/cars/:id?', deleteOneCar); //jei ner ? tada neleidzia tikrint ar is viso ivestas
router.get('/cars/:id', carById);
router.get('/test-db', testDb);

module.exports = router;
