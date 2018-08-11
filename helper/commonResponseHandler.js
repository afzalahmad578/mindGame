/**
 * @param res {Function} Response 
 * @param success {Boolean} Http Status Code for the response
 * @param result {Object/Array} Result for the Response
 * @param message {string} Primary message for the response
 * @function commonResponse {Function} Used for Handling the Common Response
 */

module.exports.commonResponse = function (res, success, statusCode, result, message) {

    res.status(statusCode);

    return res.json({
        success: success,
        result: result || '',
        message: message || '',
        statusCode: statusCode
    });
}