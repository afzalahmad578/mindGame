const mongoose = require('mongoose');
let UserSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, index: true, required: true },
    lastName: { type: String, trim: true, index: true, sparse: true },
    email: { type: String, trim: true, index: true, default: "", sparse: true },
    password: { type: String },
    profilePicURL: { type: String, default: "" },
    accessToken: { type: String, trim: true, index: true },
    deviceToken: { type: String, trim: true, index: true },
    deviceType: {
        type: String, enum: [
            constant.DEVICE_TYPES.IOS,
            constant.DEVICE_TYPES.ANDROID
        ]
    },
    status: {
        type: String,
        enum: [
            constant.STATUS.ACTIVE,
            constant.STATUS.DELETED,
            constant.STATUS.BLOCKED,
            constant.STATUS.DEACTIVATED,
        ],
        default: constant.STATUS.ACTIVE
    },
    is_updated: { type: Number, deafult: 0 },
    isLogin: { type: Boolean, default: false, required: true },
    facebookId: { type: String, trim: true, index: true, sparse: true },
    faceBookLogin: { type: Boolean, default: false },
    created_at: { type: Date },
    updated_at:{ type: Date },
    is_deleted: { type: Boolean, default: false },
});
module.exports = mongoose.model('users', UserSchema);