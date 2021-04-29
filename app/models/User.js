const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true,
        max: 255
    },
    email : {
        type : String,
        required: true,
        max: 255
    },
    password: {
        type : String,
        require: true,
        min: 8,
        max: 1024
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema)