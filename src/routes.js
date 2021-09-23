const router = require('express').Router();

router.get('/', function (req, res){
    res.send('ok')
})

module.exports = router