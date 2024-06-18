var express = require('express');
var router = express.Router();
const {postEmployeeRegister,showEmployeeRegister,listEmployees}=require('../controller/employee.controller');
const { checkFile } = require('../middleware/employee.auth');
const multer = require('multer')
const upload=multer({dest:'./public/uploads'})
/* GET users listing. */
router.get('/', listEmployees);
router.get('/register', showEmployeeRegister)
router.post('/register',checkFile,postEmployeeRegister)
module.exports = router;
