const Joi = require('joi');
/**
 * User listing validation
 */
exports.userListingValidation = function (req, res, cb) {
    Joi.validate({
        search: req.query.search,
        joiningFrom: req.query.joiningFrom,
        joiningTo: req.query.joiningTo,
        status: req.query.status,
        pageNo: req.query.pageNo,
        limit: req.query.limit,
        sortedby: req.query.sortedby,
        sortedtype: req.query.sortedtype
    },
        {
            search: Joi.string().trim().optional().allow(""),
            joiningFrom: Joi.date().optional().allow(""),
            joiningTo: Joi.date().optional().allow(""),
            status: Joi.string().optional().allow(""),
            pageNo: Joi.number().required(),
            limit: Joi.number().required(),
            sortedby: Joi.string().optional().allow(""),
            sortedtype: Joi.number().optional().allow("")
        }, (err, value) => {
            if (err) {
                response(res, false, ErrorCode.BAD_REQUEST, err.name, err.details[0].message);
            } else {
                cb(null, true)
            }
        })
}