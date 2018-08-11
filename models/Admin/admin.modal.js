const mongoose = require('mongoose');
let AdminSchema = new mongoose.Schema({
    name: { type: String, trim: true, index: true, default: null, sparse: true },
    email: { type: String, trim: true, unique: true, index: true },
    contactNo: { type: Number, trim: true, index: true },
    superAdmin: { type: Boolean, default: false },
    accessToken: { type: String, trim: true, index: true, sparse: true },
    password: { type: String },
    registrationDate: { type: Date, default: new Date(), required: true },
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