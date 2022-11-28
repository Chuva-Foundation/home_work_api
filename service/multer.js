const multer = require('multer');
const { mkdirSync, existsSync } = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDir = `uploads/user${req.userId}`;
        if (!existsSync(path.resolve(__dirname, '..', userDir))){
            mkdirSync(path.resolve(__dirname, '..', userDir));
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        const uniqueSufix = Date.now() + '-' + Math.round(Math.random()*1E5);
        cb(null, uniqueSufix + '-' +  file.originalname);
        req.dir_path = path.resolve(__dirname, '..', `uploads/user${req.userId}`, uniqueSufix + '-' +  file.originalname);
    }

});


const upload = multer({storage: storage});
module.exports = upload;