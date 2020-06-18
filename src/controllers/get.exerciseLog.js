const Exercise = require('../exercise')

function getExerciseLog(req, res) {
    let { userId, from, to, limit } = req.query
    console.log(from, to, limit)
    Exercise.getLogById(userId, res)
}

module.exports = getExerciseLog
