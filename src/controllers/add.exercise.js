const Exercise = require('../exercise')

function addExercise(req, res) {
    try {
        let { userId, description, duration, date } = req.body
        if (userId && description && duration) {
            new Exercise(userId, description, duration, date).save(res)
        } else {
            res.json({ error: 'Please fill out all the fields!' })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = addExercise
