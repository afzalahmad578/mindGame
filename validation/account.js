const Joi = require('joi');
/**
 * Login validation
 **/
exports.loginValidation = function (req, res, cb) {
    
    Joi.validate({
        email: req.body.email,
        password: req.body.password
    }, {
            email: Joi.string().email().lowercase().trim().required(),
            password: Joi.string().trim().required(),
        }, (err, value) => {
            if (err) {
                response(res, false, ErrorCode.BAD_REQUEST, err.name, err.details[0].message);
            } else {
                cb(null, true)
            }
        })
}
/**
 * forgot password validation
 **/
exports.forgetPasswordValidation = function (req, res, cb) {
    Joi.validate({
        email: req.body.email
    }, {
            email: Joi.string().email().lowercase().trim().required(),
        }, (err, value) => {
            if (err) {
                response(res, false, ErrorCode.BAD_REQUEST, err.name, err.details[0].message);
            } else {
                cb(null, true)
            }
        })
}
/**
 * Resest password validation
 **/
exports.resetPasswordValidation = function (req, res, cb) {
    Joi.validate({
        token: req.body.token,
        resetPassword: req.body.resetPassword,
        confirmPassword: req.body.confirmPassword
    }, {
            token: Joi.string().required(),
            resetPassword: Joi.string().required(),
            confirmPassword: Joi.string().required()
        }, (err, value) => {
            if (err) {
                response(res, false, ErrorCode.BAD_REQUEST, err.name, err.details[0].message);
            } else {
                cb(null, true)
            }
        })
}