const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer')

router.post('/',multer(multerConfig).single('file'), (req, res)=>{
    console.log(req.file);
    res.status(201).json({"name": "test"});
})
router.get('/', (req, res)=>{
    res.send('Hello world')
})
module.exports = router