const express = require('express');
const morgan = require('morgan'); 
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/v1', routes)

app.listen(3333, ()=>{
    console.log('Server in ruuning on port 3333');
})