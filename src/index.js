const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const mongoose = require('mongoose')

const app = express();


mongoose.connect(
    `mongodb://example:123456@0.0.0.0:27017/root?authSource=admin`,
    {
        useNewUrlParser: true,
    }
)

mongoose.connection.on('error', () => console.error('connection error:'))
mongoose.connection.once('open', () => console.log('database connected'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/v1', routes)

app.listen(3333, () => {
    console.log('Server in ruuning on port 3333');
})