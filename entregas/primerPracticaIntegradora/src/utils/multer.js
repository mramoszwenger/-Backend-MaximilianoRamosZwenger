const multer = require('multer');
const { dirname } = require('node:path');

console.log(dirname(__dirname));

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, dirname(__dirname)+'/public/uploads')
    },

    filename: function (request, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
});

const uploader = multer({
    storage
});

module.exports = {
    uploader
}