const account = require('../../controllers/admin/account.controller')
const userController = require('../../controllers/admin/user.controller')
const middleware = require('../../middleware/auth')
const express = require('express');
const router = express.Router();
const {
    loginValidation,
    forgetPasswordValidation,
    resetPasswordValidation
} = require('../../validation/account')
const {
    userListingValidation
} = require('../../validation/userValidation')

router.put('/login', loginValidation, account.login)
router.post('/forgetPassword', forgetPasswordValidation, account.forgetPassword)
router.post('/resetPassword', resetPasswordValidation, account.resetPassword)
router.get('/userListing', middleware.jwtAuthAdmin, userListingValidation, userController.userListing)

module.exports = router;