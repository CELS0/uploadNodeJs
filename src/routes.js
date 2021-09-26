const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer')

const Post = require('./models/Post')

router.post('/', multer(multerConfig).single('file'), async(req, res) => {
    const { originalname: name, size, filename: key } = req.file
try{
    const post = await Post.create({
        name,
        size,
        key,
        url: ''
    })
} catch(e){
    console.log('ERROR:::::',e)
}

    res.status(201).json(post);
})
router.get('/', (req, res) => {
    res.send('Hello world')
})
module.exports = router