const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { commonResponse: response } = require('../helper/commonResponseHandler')
const { ErrorMessage } = require('../helper/Messages')
const { ErrorCode } = require('../helper/statusCodes')
const config = require('../config/config')


exports.basicAuthUser = function (req, res, next) {
    var credentials = auth(req);
    if (!credentials || credentials.name !== config.config()['basicAuthUser'] || credentials.pass !== config.config()['basicAuthKey']) {
        res.statusCode = ErrorCode['UNAUTHORIZED']
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        response(res, true, ErrorCode.UNAUTHORIZED, [], ErrorMessage.INVALID_TOKEN);
    } else {
        next();
    }
}

exports.jwtAuthAdmin = async (req, res, next) => {
    if (req.headers['jwtauthorization']) {

        let token = req.headers['jwtauthorization']
        let headerType = String(token).split(' ')[0];
        let headertoken = String(token).split(' ')[1];

        let query = {};
        query['accessToken'] = headertoken;

        if (headerType == 'bearer' && headertoken != '') {

            console.log('headertoken  ', headertoken)

            query['accessToken'] = headertoken;
            let adminData = await DBManager.findOne("Admins", { accessToken: headertoken }, {}, { lean: true })
            if (adminData) {
                // verify token for admin
                jwt.verify(headertoken, config.config()['jwtSecretKey'], (err, decoded) => {
                    if (err) {
                        console.log('error', err);
                        response(res, true, ErrorCode.UNAUTHORIZED, [], ErrorMessage.INVALID_TOKEN);
                    }
                    else {
                        console.log('decoded-->', decoded);
                        req.decoded = decoded;
                        req.decoded.adminId = UniversalFunctions.encryptData(String(req.decoded['_id']));
                        next();
                    }
                })
            } else {
                response(res, true, ErrorCode.UNAUTHORIZED, [], ErrorMessage.INVALID_TOKEN);
            }

        }
        else {
            response(res, true, ErrorCode.UNAUTHORIZED, [], ErrorMessage.INVALID_TOKEN);
        }

    }
    else {
        response(res, true, ErrorCode.UNAUTHORIZED, [], ErrorMessage.INVALID_TOKEN);
    }
}

exports.jwtAuthUser = async (req, res, next) => {
    if (req.headers['accessToken']) {

        let token = req.headers['accessToken']
        let headerType = String(token).split(' ')[0];
        let headertoken = String(token).split(' ')[1];

        let query = {};
        query['accessToken'] = headertoken;

        if (headerType == 'bearer' && headertoken != '') {

            console.log('headertoken  ', headertoken)

            query['accessToken'] = headertoken;
            let studentData = await DBManager.findOne("Users", { accessToken: headertoken }, {}, { lean: true })
            if (studentData) {
                // verify token for admin
                jwt.verify(headertoken, config.config()['pa_jwtSecretKey'], (err, decoded) => {
                    if (err) {
                        console.log('error', err);
                        response(res, true, ErrorCode.UNAUTHORIZED, {}, ErrorMessage.INVALID_TOKEN);
                    }
                    else {
                        console.log('decoded-->', decoded);
                        req.decoded = decoded;
                        req.studentData = studentData;
                        req.decoded.id = UniversalFunctions.encryptData(String(req.decoded['id']));
                        next();
                    }
                })
            } else {
                response(res, true, ErrorCode.UNAUTHORIZED, {}, ErrorMessage.INVALID_TOKEN);
            }

        }
        else {
            response(res, true, ErrorCode.UNAUTHORIZED, {}, ErrorMessage.INVALID_TOKEN);
        }

    }
    else {
        response(res, true, ErrorCode.UNAUTHORIZED, {}, ErrorMessage.INVALID_TOKEN);
    }
}

/*Check existence of admin by id that find through token*/
exports.ChekAdminExist = (req, res, next) => {
    var query = { _id: req.decoded.userId }
    GlobalModal.Admin.findByParams(query, function (err, adminData) {
        if (err) {
            console.log(err)
            //response(res, false, ErrorCode.INTERNAL_ERROR, [], ErrorMessage.INTERNAL_ERROR);
        }
        else {
            //console.log(adminData)
            if (adminData.length) {
                req.adminInfo = adminData[0];
                next();
            } else {

            }
        }
    })

}