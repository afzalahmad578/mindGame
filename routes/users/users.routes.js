const express = require('express');
const router = express.Router();
const { SERVER } = require('../../config/constant')


// Require Middle Wares
const {
  checkEmail,
  checkPassword,
  checkId,
  checkName
} = require('../../middleware/Validators');
const {
  basicAuthUser,
  jwtAuthUser
} = require('../../middleware/auth');

const {
  login,
  signup,
  forgetPassword,
  logout
} = require('../../controllers/users/account.controller')

//signup api

/** * @swagger 
 * /user/signup:
 *   post:
 *     tags:
 *       - Users
 *     description: user signup
 *     produces:
 *       - application/json
 *     parameters:
 *       -  name: authorization
 *          in: header
 *          description: use this "Basic cHJlc2VudGFwcDpEQUY4N0RTRkRTRkRTQTk4RlNBREtKRTMyNEtKTDMySEZEN0ZEU0ZCMjQzNDNKNDlEU0Y="
 *          type: string
 *          required: true
 *       - name: firstName
 *         description: please enter first name 
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: please enter last name 
 *         in: formData
 *         required: false
 *         type: string
 *       - name: email
 *         description: please enter emai 
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: please enter password 
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       499:
 *         description: unauthorized
 */
router.post(
    '/signup',
    basicAuthUser,
    checkEmail,
    checkPassword,
    checkName,
    signup
  );

    
/** * @swagger 
 * /user/login:
 *   post:
 *     tags:
 *       - Users
 *     description: user login
 *     produces:
 *       - application/json
 *     parameters:
 *       -  name: authorization
 *          in: header
 *          description: use this "Basic cHJlc2VudGFwcDpEQUY4N0RTRkRTRkRTQTk4RlNBREtKRTMyNEtKTDMySEZEN0ZEU0ZCMjQzNDNKNDlEU0Y="
 *          type: string
 *          required: true
 *       - name: email
 *         description: please enter email 
 *         in: formData
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: please enter password 
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       499:
 *         description: unauthorized
 */

router.post(
  '/login',
  basicAuthUser,
  checkEmail,
  checkPassword,
  login
);

//forget password
/** * @swagger 
 * /user/forget-password:
 *   post:
 *     tags:
 *       - Users
 *     description: user signup
 *     produces:
 *       - application/json
 *     parameters:
 *       -  name: accessToken
 *          in: header
 *          description: append with bearer
 *          type: string
 *          required: true
 *       -  name: authorization
 *          in: header
 *          description: use this "Basic cHJlc2VudGFwcDpEQUY4N0RTRkRTRkRTQTk4RlNBREtKRTMyNEtKTDMySEZEN0ZEU0ZCMjQzNDNKNDlEU0Y="
 *          type: string
 *          required: true
 *       - name: email
 *         description: please enter email 
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       499:
 *         description: unauthorized
 */
router.post(
  '/forget-password',
  basicAuthUser,
  checkEmail,
  forgetPassword
);

/** * @swagger 
 * /user/logout:
 *   post:
 *     tags:
 *       - Users
 *     description: user logout
 *     produces:
 *       - application/json
 *     parameters:
 *       -  name: accessToken
 *          in: header
 *          description: append with bearer
 *          type: string
 *          required: true
 *       -  name: authorization
 *          in: header
 *          description: use this "Basic cHJlc2VudGFwcDpEQUY4N0RTRkRTRkRTQTk4RlNBREtKRTMyNEtKTDMySEZEN0ZEU0ZCMjQzNDNKNDlEU0Y="
 *          type: string
 *          required: true
 *       - name: id
 *         description: please enter user id 
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *       499:
 *         description: unauthorized
 */

router.post(
  '/logout',
  basicAuthUser,
  jwtAuthUser,
  checkId,
  logout
);

module.exports = router;