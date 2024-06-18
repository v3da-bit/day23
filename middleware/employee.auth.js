const multer = require('multer')
const { v4: uuid } = require('uuid')
var path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = uuid()+path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
const upload = multer({
    storage: storage,
    limits: {fileSize:2048576},
    fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.jpeg' && ext !== '.pdf') {
        return callback(new Error('Only images and pdfs are allowed'))
    }
    callback(null, true)
} })
module.exports.checkFile = async function(req, res, next) {
    try {
        console.log('check files');
        let error
        await upload.array('file')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                error = err.message
                next(error)
               
            } else if (err) {
                error = err.message
                next(error)
               
            }
            console.log('here files', req.files);
            next()
        })
    } catch (error) {
        next(error)
    }
}