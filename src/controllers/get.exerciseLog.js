const Exercise = require('../exercise')

function getExerciseLog(req, res) {
    // let { userId, from, to, limit } = req.query
    Exercise.getLogById(req, res)
}

module.exports = getExerciseLog
