const crypto = require('crypto');
const { config } = require('../config/config');
const randomstring = require('randomstring')

/**
 * @param {String} text 
 */
exports.hashPassword = (text) => {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHmac('sha256', config().salt);
        hash.update(text.toString());
        resolve(hash.digest('hex'));
    })
}

/**
 * @description This function return encrypted item for given string
 * @param {String} text  
 */
exports.encryptData = (text) => {
    try {
        const cip = crypto.createCipher('aes192', config().cipher);
        let encrypted = cip.update(text.toString(), 'utf8', 'hex');
        encrypted += cip.final('hex');
        console.log(encrypted);
        return encrypted;
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * @description This function return decrypted item for given encryption
 * @param {String} encrypted 
 */
exports.decryptedData = (encrypted) => {
    try {
        const decipher = crypto.createDecipher('aes192', config().cipher);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        console.log(decrypted);
        return decrypted;
    } catch (err) {
        console.error(err);
        return null;
    }

}
/**
 * @generate random string
 */
exports.generateRandomString = function () {
    return randomstring.generate(7);
};
