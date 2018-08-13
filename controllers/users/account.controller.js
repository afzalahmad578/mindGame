
const { sendMail } = require('../../helper/emailSend')
const jwt = require('jsonwebtoken');
const Template = require('../../util/Template')
const moment = require('moment');

/**
 * @function signup
 * @param {object} req
 * @param {object} res
 * @description  this function is used to signup 
 */

exports.signup = async (req, res) => {

    try {

        let { email, firstName, lastName, password } = req.body;
        lastName = lastName && lastName != '' ? lastName : '';

        let userData = await DBManager.findOne("Users", { email: email.trim() }, {}, { lean: true });

        if (!studentData) {

            let insertData = {
                "name": firstName.trim() + ' ' + lastName.trim(),
                "firstName": firstName.trim(),
                "lastName": lastName.trim(),
                "email": email.trim(),
                "password": UniversalFunctions.encryptData(password),
                "created_at": new Date(),
                "updated_at": new Date(),
                "is_deleted": false,
                "is_updated": 0,
                "status": 'ACTIVE',
            };

            console.log(insertData);

            let studentInsertedData = await DBManager.saveData("Users", insertData);

            response(res, true, SuccessCode.SUCCESS, {}, SuccessMessage.SUCCESS);

        } else {
            response(res, false, ErrorCode.ALREADY_EXIST, {}, ErrorMessage.EMAIL_EXIST, '');
        }

    } catch (error) {
        console.log(error)
        response(res, false, ErrorCode.INTERNAL_ERROR, {}, ErrorMessage.SOMETHING_WRONG);
    }

}
/**
 * @function login
 * @param {object} req
 * @param {object} res
 * @description  this function is used to Login 
 */

exports.login = async (req, res) => {
    try {
        // insert user data in db 
        let reqData = {
            email: req.body.email,
            password: UniversalFunctions.encryptData(req.body.password),
        };
        let userData = await DBManager.findOne("Users", { email: req.body.email }, {}, { lean: true })
        if (userData) {
            if (userData['password'] == reqData.password) {
                let tokenData = {
                    id: UniversalFunctions.encryptData(String(userData['_id'])),
                    timeStamp: Date.now()

                };
                var token = jwt.sign(tokenData, config.config()['jwtSecretKey'], {
                    // expiresIn: config.config()['jwtExpireTime']
                });
                let criteria = { _id: userData['_id'] };

                let update = {
                    $set: { accessToken: token },
                }
                let userDataUpdated = await DBManager.findAndUpdate("Users", criteria, update, { new: true })
                response(res, true, SuccessCode.SUCCESS, userDataUpdated, SuccessMessage.LOGIN_SUCCESS);
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
        status:'ACTIVE'
    };

    let projection = {};
    let option = { lean: true };
    let queryResponse = await DBManager.getData("Users", criteria, projection, option)
    return queryResponse;
}

/**
 *forget password
 */
exports.forgetPassword = async (req, res) => {

    try {

        let step1 = await verifyEmail(req.body);
        if (step1 && step1.length > 0) {
            let userData = await DBManager.findOne("Users", { email: req.body.email }, {}, { lean: true })
            let mailContent = await (Template.TemplateUtil(process.cwd() + '/views/resetPassword.ejs', { password: userData['password'], firstName: userData['firstName'], lastName: userData['lastName'] }))
            var mailOptions = {
                from: constant.SERVER.SUPPORT_EMAIL,
                to: req.body.email,
                subject: constant.SERVER.EMAIL_SUB,
                text: 'Reset Password.',
                html: mailContent
              }
        
            sendMail(mailOptions);
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


/**
 * @function logout
 * @param {object} req
 * @param {object} res
 * @description  this function is used to logout 
 * @author Afzal
 */

exports.logout = async (req, res) => {
    
        try {
            let { id: userId } = req.body;
            if (userId) {
                let where = { '_id': mongoose.Types.ObjectId(userId) }
                let insertData = {
                    "access_token": '',
                };
                let schoolData = await DBManager.findAndUpdate("Users", where, insertData, { new: true })
                response(res, true, SuccessCode.SUCCESS, {}, SuccessMessage.SUCCESS);
    
            } else {
                response(res, false, ErrorCode.INVALID_CREDENTIAL, {}, ErrorMessage.INVALID_CREDENTIAL, '');
            }
        } catch (error) {
            console.log(error);
            response(res, false, ErrorCode.SOMETHING_WRONG, {}, ErrorMessage.SOMETHING_WRONG);
        }
    
    }