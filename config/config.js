module.exports.config = () => {
    conf = {};
    switch (process.env.NODE_ENV) {
        case 'staging':
            conf.mongodb = "mongodb://172.31.16.231:61263/bmi_stage_db";
            conf.auth = {
                user: '',
                password: ''
            }
            conf.port = 7142;
            conf.host = '52.8.169.78:7142';
            conf.smtpEmail = 'noreply@applaurels.com';
            conf.salt = 'CMp7P2kh8f';
            conf.cipher = 'wdUKpoCDWq7a2OHSA96Q';
            conf.basicAuthUser = 'aqbmi';
            conf.basicAuthKey = 'DAF87DSFDSFDSA98FSADKJE324KJL32HFD7FDSFB24343J49DSF';
            conf.jwtSecretKey = 'SFDSA78FSA7FFDSAFJRE32DSF98DSGFDGFDSH9H8FDSGFR4R549898DFDS';
            conf.jwtExpireTime = '259200000'
            conf.otpExpireTime = '30000'
            break;
        case 'development':
            conf.mongodb = "mongodb://172.31.16.231:61263/bmi_dev_db";
            conf.auth = {
                user: '',
                password: ''
            }
            conf.port = 7142;
            conf.host = '52.8.169.78:7142';
            conf.smtpEmail = 'noreply@applaurels.com';
            conf.salt = 'CMp7P2kh8f';
            conf.cipher = 'wdUKpoCDWq7a2OHSA96Q';
            conf.basicAuthUser = 'aqbmi';
            conf.basicAuthKey = 'DAF87DSFDSFDSA98FSADKJE324KJL32HFD7FDSFB24343J49DSF';
            conf.jwtSecretKey = 'SFDSA78FSA7FFDSAFJRE32DSF98DSGFDGFDSH9H8FDSGFR4R549898DFDS';
            conf.jwtExpireTime = '259200000'
            conf.otpExpireTime = '30000'
            break;
        default:
            conf.mongodb = "mongodb://localhost:27017/mindgame";
            conf.auth = {
                user: '',
                password: ''
            }
            conf.port = 3000;
            conf.host = 'localhost:3000';
            conf.baseUrl = 'http://localhost:3000/';
            conf.smtpEmail = 'noreply@applaurels.com';
            conf.salt = 'CMp7P2kh8f';
            conf.cipher = 'wdUKpoCDWq7a2OHSA96Q';
            conf.basicAuthUser = 'admin';
            conf.basicAuthKey = 'DAF87DSFDSFDSA98FSADKJE324KJL32HFD7FDSFB24343J49DSF';
            conf.jwtSecretKey = 'SFDSA78FSA7FFDSAFJRE32DSF98DSGFDGFDSH9H8FDSGFR4R549898DFDS';
            conf.jwtExpireTime = '259200000'
            conf.otpExpireTime = '30000'
    }
    return conf;
}