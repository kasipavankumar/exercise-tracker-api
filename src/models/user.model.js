const mongoose = require('mongoose')

const { Schema } = mongoose

/** Exercise Schema. */
let exerciseLog = new Schema({
    description: {
        type: String,
    },
    duration: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
        default: new Date().toUTCString(),
    },
})

/** User Schema with Exercise schema as the subdocument. */
let user = new Schema({
    _id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
    log: [exerciseLog],
})

module.exports = mongoose.model('exercise_tracker', user)

// let userSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     _id: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         default: '',
//         required: false,
//     },
//     duration: {
//         type: Number,
//         default: 0,
//         required: false,
//     },
//     date: {
//         type: Date,
//         default: Date.now(),
//         required: false,
//     },
// })
