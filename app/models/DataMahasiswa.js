const mongoose = require('mongoose');

const DataMahasiswaSchema = mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    nim : {
        type : Number,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('DataMahasiswa', DataMahasiswaSchema);