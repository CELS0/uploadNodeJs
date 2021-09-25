const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uplaods'),
    storage: multer.diskStorage({
        destination: (req,file, cb) =>{
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uplaods') )
        },
        filename: (req,file, cb) =>{
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, filename);
            })
        },
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMines = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif',
        ];
        if (allowedMines.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'))
        }
    }
};