require('dotenv').config();

const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/carRoute');
const checkConnection = require('./models/dbconn');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
const port = process.env.PORT;

app.use('/', router);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  checkConnection();
});
