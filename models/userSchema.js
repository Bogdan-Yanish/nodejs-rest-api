const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        subscription: {
            type: String,
            enum: ["starter", "pro", "business"],
            default: "starter"
        },
        token: String
    },
    { versionKey: false, timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;