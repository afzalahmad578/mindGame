
/** 
 * @description All the Error messages that needed to be sent to Admin
 * @type {Object}
*/
module.exports.ErrorMessage = Object.freeze({
    INVALID_TOKEN: 'Unauthorized User',
    INTERNAL_ERROR : 'Internal Server Error',
    INVALID_CREDENTIAL:'Invalid credential',
    SOMETHING_WRONG:'Something went wrong!',
    EMAIL_NOT_REGISTERED:'Email not registered',
    RESET_PASSWORD_EXPIRED:'Token has been expire',
    WRONG_PASSWORD:'Please enter valid password',
    EMAIL_EXIST:'Email already exist',
    ADMIN: {
        INVALID_TOKEN: 'Invalid Token',
        CONFIRM_PASSWORD_INVALID: 'Password and Confirm password does not match',
    }
});

/** 
 * @description All the Success messages that needed to be sent to Admin
 * @type {Object}
*/
module.exports.SuccessMessage = Object.freeze({
    LOGIN_SUCCESS: 'You have successfully login.',
    FORGET_SUCCESS: 'Password link has been send successfully',
    RESET_SUCCESS:'Password changed successfully',
    USER_LIST_FETCH:'User list fetch successfully'
});