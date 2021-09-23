const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uplaods'),
    storage: multer.diskStorage({
destination: ()
    }),
    limits: {
        fileSize: 2 * 1024 + 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMines = [
            'image/jpeg', 
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];
        if(allowedMines.includes(file.mimetype)) {
            cb(null,true);
        }else{
            cb(new Error('Invalid file type'))
        }
    }
};