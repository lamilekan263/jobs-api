const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'first name is required'],
        minLength: 4
    },
    lastName: {
        type: String,
        required: [true, 'last name is required'],
        minLength: 4
    },
    userName: {
        type: String,
        required: [true, 'user name is required'],
        minLength: 4
    },

    email: {
        type: String,
        required: [true, 'user name is required'],
        minLength: 4,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: [true, 'password is required'],
        minLength: 4,
    },
});


UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, process.env.SALT );
});


UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

UserSchema.methods.createJWT = function () {


    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d'
    });
};

module.exports = mongoose.model('User', UserSchema);