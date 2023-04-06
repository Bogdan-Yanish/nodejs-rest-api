const express = require('express')

const router = express.Router()

const { register, login, getCurrentUser, logout, updateStatusUser, updateAvatarUser } = require('../../controllers/users')
const { controllerWrap } = require('../../helpers/controllerWrap');
const { userRegisterValidation, userLoginValidation, userStatusValidation } = require('../../middlewares/userValidation');
const authValidation = require('../../middlewares/authValidation');
const upload = require('../../middlewares/upload');

router.post('/register', userRegisterValidation, controllerWrap(register));

router.get('/verify/:verificationToken');

router.post('/login', userLoginValidation, controllerWrap(login));

router.get('/current', authValidation, controllerWrap(getCurrentUser));

router.post('/logout', authValidation, controllerWrap(logout));

router.patch('/', authValidation, userStatusValidation, controllerWrap(updateStatusUser));

router.patch('/avatars', authValidation, upload.single("avatar"), controllerWrap(updateAvatarUser));

module.exports = router;