const multer = require("multer");
const path = require("path");

const tmpDir = path.join(process.cwd(), "tmp");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tmpDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

module.exports = upload;
