const express = require('express');
const router = express.Router();

router.get('/cars', carController);

module.exports = router;