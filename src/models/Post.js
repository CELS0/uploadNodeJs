const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const s3 = new aws.S3();
const { promisify } = require('util')

const PostSchema = new mongoose.Schema({
    name: 'String',
    size: 'Number',
    key: 'String',
    url: 'String',
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

PostSchema.pre('save', function () {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/files/${this.key}`
    }
})

PostSchema.pre('remove', function () {
    if (process.env.STORAGE_TYPE === 's3') {
        return s3.deleteObject({
            Bucket: process.env.AWS_BUCKETS,
            Key: this.key,
        }).promise();
    }else{
        return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uplaods', this.key))
    }
})
module.exports = mongoose.model('Post', PostSchema)