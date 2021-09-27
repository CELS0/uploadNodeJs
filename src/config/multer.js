const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const molderS3 = require('multer-s3')
const aws = require('aws-sdk')

const storageTypes ={
    local: multer.diskStorage({
        destination: (req,file, cb) =>{
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uplaods') )
        },
        filename: (req,file, cb) =>{
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, file.key);
            })
        },
    }),
    s3: molderS3({
        s3: new aws.S3(),
        bucket: 'uploadnodejs',
        contentType: molderS3.AUTO_CREATE_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) =>{
            crypto.randomBytes(16, (err, hash)=>{
                if(err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, filename);
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uplaods'),
    storage: storageTypes['s3'],
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