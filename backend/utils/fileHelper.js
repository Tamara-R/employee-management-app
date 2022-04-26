'use strict';
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage, 
    limits: { fileSize: 16 * 1024 * 1024 } // 16 MB
});

module.exports = {upload}