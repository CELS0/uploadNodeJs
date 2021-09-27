require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const mongoose = require('mongoose')
const path = require('path');

const app = express();


mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
    }
)

mongoose.connection.on('error', () => console.error('connection error:'))
mongoose.connection.once('open', () => console.log('database connected'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
    "/files",
    express.static(path.resolve(__dirname, '..', '..', 'tmp', 'uplaods'))
  );
app.use(routes)

app.listen(3333, () => {
    console.log('Server in ruuning on port 3333');
})