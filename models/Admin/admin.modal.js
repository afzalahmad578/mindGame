const mongoose = require('mongoose');
let AdminSchema = new mongoose.Schema({
    name: { type: String, trim: true, index: true, default: null, sparse: true },
    email: { type: String, trim: true, unique: true, index: true },
    accessToken: { type: String, trim: true, index: true, sparse: true },
    password: { type: String },
    passwordResetToken:{ type: String, default: '' },
    passwordResetTokenExpirationTime:{ type: String, default: '' },
    status: {
        type: String,
        enum: [
            constant.STATUS.ACTIVE,
            constant.STATUS.DELETED,
            constant.STATUS.BLOCKED,
            constant.STATUS.DEACTIVATED
        ],
        default: constant.STATUS.ACTIVE
    },
    image: { type: String, default: '' },
});
module.exports = mongoose.model('Admin', AdminSchema);