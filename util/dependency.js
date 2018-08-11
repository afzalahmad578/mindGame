global.mongoose = require('mongoose');
global.express = require('express');
global.async = require('async');

global.config = require('../config/config')
global.constant = require('../config/constant')

global.UniversalFunctions = require('../util/UniversalFunction');
let { DAOManager } = require('../util/dbManager')
global.DBManager = DAOManager;
let { commonResponse } = require('../helper/commonResponseHandler')
global.response = commonResponse;
let { SuccessMessage, ErrorMessage } = require('../helper/Messages')
global.SuccessMessage = SuccessMessage;
global.ErrorMessage = ErrorMessage;
let { SuccessCode, ErrorCode } = require('../helper/statusCodes')
global.SuccessCode = SuccessCode;
global.ErrorCode = ErrorCode;