let mongoose = require('mongoose')

let exerciseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('et_exercise', exerciseSchema)
