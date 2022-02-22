require('dotenv').config();

const express = require('express');

const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
const port = process.env.PORT;

app.get('/cars', (req, res) => {
  res.send('hello');
});

app.listen(port, console.log(`server running on port ${port}`));
