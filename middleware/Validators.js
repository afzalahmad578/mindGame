
const Joi = require('joi');


/**
 * checkEmail validation
 **/
exports.checkEmail = function (req, res, cb) {
    Joi.validate({
        email: req.body.email
    }, {
            email: Joi.string().required().regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),
        }, (err, value) => {
            if (err) {
                response(res, false, ErrorCode.BAD_REQUEST, err.name, err.details[0].message);
            } else {
                cb(null, true)
            }
        })
}

/**
 * check id
 */
exports.checkId = function (req, res, cb) {
    Joi.validate({
        id: req.body.id
    }, {
            id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
        }, (err, value) => {
            if (err) {
                response(res, false, ErrorCode.BAD_REQUEST, err.name, err.details[0].message);
            } else {
                cb(null, true)
            }
        })
}


/**
 * password validation
**/
exports.checkPassword = function (req, res, cb) {
    Joi.validate({
        password: req.body.password
    }, {
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
 * name validation
**/
exports.checkName = function (req, res, cb) {
    Joi.validate({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }, {
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().optional().allow('')
        }, (err, value) => {
            if (err) {
                response(res, false, ErrorCode.BAD_REQUEST, err.name, err.details[0].message);
            } else {
                cb(null, true)
            }
        })
}



