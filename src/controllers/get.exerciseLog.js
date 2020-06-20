const Exercise = require('../exercise')

function getExerciseLog(req, res) {
    Exercise.getLogById(req, res)
}

module.exports = getExerciseLog
