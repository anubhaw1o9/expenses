const crypto = require("crypto")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {type: String, /*required: [true, "please provide a name"] */},
    password: {type: String, required: [true, "Please provide a password"], select: false, minlength: 5},
    contactno: {type: Number},
    email: {
        type: String, 
        unique: 1, 
        trim: true, 
        required: true, 
        match: [
           /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/,
          // /^(([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"))$/,
           "Please provide a valid email"
        ]
    },
    dob: {type: Date, /*required: [true, "Please provide Date of Birth"]*/},
    resetPasswordToken: String,
    resetPasswordExpire: Date,
},{timestamps: true,}
);

userSchema.pre("save", async function(next) {
    if (!this.isModified ("password")) {
        next();
    }
    
    const salt = await bcrypt.genSalt(10); //higher no more secure
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

userSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE, 
    });
};

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    
    return resetToken;
};

const User = mongoose.model('User', userSchema);
module.exports = User; //or exports.User=User // to import fncs to other pages