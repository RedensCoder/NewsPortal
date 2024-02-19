const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const dir = `files/users/${req.params.id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename(req, file, cb) {
        cb(null, "avatar.png");
    }
});

const types = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (req, file, cb) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports =  multer({storage, fileFilter})