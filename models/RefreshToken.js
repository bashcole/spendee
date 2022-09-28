import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema(
    {
        _id: {type: String, required: true},
        userID: {
            type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,
            index: {expires: 60 * 60 * 24} // 24 hours
        },
        expireAt: {
            type: Date,
            default: new Date(Date.now() + 60*60*24*1000),
            index: {expires: 60 * 60 * 24} // 24 hours
        },
        createdByIp: {type: String}
    }
);

RefreshTokenSchema.virtual('isExpired').get(function () {
    return Date.now() >= this.expireAt;
});

RefreshTokenSchema.virtual('isActive').get(function () {
    return !this.isExpired;
});

export default mongoose.model("RefreshToken", RefreshTokenSchema);
