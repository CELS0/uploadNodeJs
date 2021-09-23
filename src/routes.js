const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer')

router.post('/',multer(multerConfig).single('file'), (req, res)=>{
    res.status(201).json({"name": "test"});
})

module.exports = router