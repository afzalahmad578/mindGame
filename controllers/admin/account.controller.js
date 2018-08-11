
const { sendMail } = require('../../helper/emailSend')
const jwt = require('jsonwebtoken');
const Template = require('../../util/Template')
const moment = require('moment')
/**
 * @function login
 * @param {object} req
 * @param {object} res
 * @description  this function is used to Login in admin panel
 */

exports.login = async (req, res) => {
    try {
        // insert admin data in db 
        let reqData = {
            email: req.body.email,
            password: UniversalFunctions.encryptData(req.body.password),
        };
        let adminData = await DBManager.findOne("Admins", { email: req.body.email }, {}, { lean: true })
        if (adminData) {
            if (adminData['password'] == reqData.password) {
                let tokenData = {
                    id: UniversalFunctions.encryptData(String(adminData['_id'])),
                    timeStamp: Date.now()

                };
                var token = jwt.sign(tokenData, config.config()['jwtSecretKey'], {
                    // expiresIn: config.config()['jwtExpireTime']
                });
                let criteria = { _id: adminData['_id'] };

                let update = {
                    $set: { accessToken: token },
                }
                let adminDataUpdated = await DBManager.findAndUpdate("Admins", criteria, update, { new: true })
                response(res, true, SuccessCode.SUCCESS, adminDataUpdated, SuccessMessage.LOGIN_SUCCESS);
            } else {
                response(res, true, ErrorCode.INVALID, [], ErrorMessage.WRONG_PASSWORD);
            }
        } else {
            response(res, false, ErrorCode.INVALID, [], ErrorMessage.EMAIL_NOT_REGISTERED);
        }
    } catch (error) {
        response(res, false, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.SOMETHING_WRONG);
    }
}

/**
 * 
 * @description forget password
 * @param {*} req 
 * @param {*} res 
 */

/**
 * Verify mail for forget password
 * */
async function verifyEmail(payloadData) {
    let criteria = {
        email: payloadData.email,
    };

    let projection = {};
    let option = { lean: true };
    let queryResponse = await DBManager.getData("Admins", criteria, projection, option)
    return queryResponse;
}
async function generatePasswordResetToken(request, payloadData) {
    let criteria = {
        email: payloadData.email,
        status: constant.STATUS.ACTIVE
    };
    let projection = {
        $set: {
            passwordResetToken: request.passwordResetToken,
            passwordResetTokenExpirationTime: request.passwordResetTokenExpirationTime,
        }
    };
    let option = {
        new: true
    };
    await DBManager.findAndUpdate("Admins", criteria, projection, option)
    return ({ passwordResetToken: request.passwordResetToken })
}

/**
 *forget password
 */
exports.forgetPassword = async (req, res) => {

    try {
        let passwordResetToken = UniversalFunctions.encryptData(UniversalFunctions.generateRandomString());
        let passwordResetTokenExpirationTime = new Date(new Date().getTime() + (10 * 60 * 1000));
        let step1 = await verifyEmail(req.body);
        if (step1 && step1.length > 0) {
            var step2 = await generatePasswordResetToken({ passwordResetToken: passwordResetToken, passwordResetTokenExpirationTime: passwordResetTokenExpirationTime }, req.body);
            let mailContent = await (Template.TemplateUtil(process.cwd() + '/views/resetPassword.html', { url: constant.SERVER.DOMAIN_NAME + '/reset/' + passwordResetToken }))
            let mailinfo = {
                senderMail: constant.SERVER.SUPPORT_EMAIL,
                receiverMail: req.body.email,
                subject: constant.SERVER.EMAIL_SUB,
                content: mailContent
            }
            sendMail(mailinfo);
        } else {
            response(res, false, ErrorCode.INVALID, [], ErrorMessage.EMAIL_NOT_REGISTERED);
        }
        if (passwordResetToken) {
            response(res, true, SuccessCode.SUCCESS, step2, SuccessMessage.FORGET_SUCCESS);
        } else {
            response(res, false, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
    } catch (error) {
        response(res, false, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }

}

//check reset password token exitstence
async function checkpasswordResetToken(passwordResetToken, res) {
    let criteria = {
        passwordResetToken: passwordResetToken
    }
    let projection = {}
    let option = {
        lean: true
    }
    let admin = await DBManager.getData("Admins", criteria, projection, option);
    if (admin && admin.length > 0) {
        // check password reset token expiry
        if (moment(new Date).isAfter(moment(admin[0].passwordResetTokenExpirationTime))) {
            return [];
        }
        return admin
    }
    else {
        return admin
    }
}
async function changePassword(payloadData, res) {
    let resetPassword = payloadData.resetPassword
    let confirmPassword = payloadData.confirmPassword
    let criteria = {
        passwordResetToken: payloadData.token,
        status: constant.STATUS.ACTIVE,
    };
    let projection = {
        $set: {
            password: UniversalFunctions.encryptData(resetPassword),
            passwordResetToken: "",
        }
    };
    let option = {
        new: true
    };
    return await DBManager.findAndUpdate("Admins", criteria, projection, option)
}

exports.resetPassword = async (req, res) => {
    try {
        let step1 = await checkpasswordResetToken(req.body.token, res)
        if (step1.length > 0) {
            if (req.body.confirmPassword && req.body.resetPassword != "" && req.body.confirmPassword != "") {
                let step2 = await changePassword(req.body, res)
                if (step2) { 
                    response(res, false, SuccessCode.SUCCESS, [], SuccessMessage.RESET_SUCCESS) 
                } else {
                    response(res, false, ErrorCode.INTERNAL_ERROR, [], SuccessMessage.INTERNAL_ERROR) 
                }
            } else {
                response(res, false, ErrorCode.INVALID, [], ErrorMessage.ADMIN.CONFIRM_PASSWORD_INVALID)
            }
        } else {
            response(res, false, ErrorCode.RESET_PASSWORD_EXPIRED, [], ErrorMessage.RESET_PASSWORD_EXPIRED)
        }
    } catch (error) {
        response(res, false, ErrorCode.SOMETHING_WRONG, [], ErrorMessage.SOMETHING_WRONG);
    }

}