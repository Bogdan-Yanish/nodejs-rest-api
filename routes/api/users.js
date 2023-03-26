const express = require('express')

const router = express.Router()

const { register, login, getCurrentUser, logout } = require('../../controllers/users')
const { controllerWrap } = require('../../helpers/controllerWrap');
const { userRegisterValidation, userLoginValidation } = require('../../middlewares/userValidation');
const authValidation = require('../../middlewares/authValidation');

router.post('/register', userRegisterValidation, controllerWrap(register));

router.post('/login', userLoginValidation, controllerWrap(login));

router.get('/current', authValidation, controllerWrap(getCurrentUser));

router.post('/logout', authValidation, controllerWrap(logout));

module.exports = router;