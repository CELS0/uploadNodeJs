const router = require('express').Router();
const multer = require('multer');
const multerConfig = require('./config/multer')

const Post = require('./models/Post')

router.post('/', multer(multerConfig).single('file'), async (req, res) => {
    const { originalname: name, size, key, location: url } = req.file
    try {
        const post = await Post.create({
            name,
            size,
            key,
            url
        })
        res.status(201).json(post);
    } catch (e) {
        console.log('ERROR', e)
    }
})
router.get('/', (req, res) => {
    res.send('Hello world')
})
module.exports = router