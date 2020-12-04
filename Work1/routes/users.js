var express = require('express');
var router = express.Router();
var userController =require('../controllers/user.controller')

router.get('/register', userController.register);
router.post('/register', userController.register);

module.exports = router;
