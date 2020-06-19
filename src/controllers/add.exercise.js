const Exercise = require('../exercise')

function addExercise(req, res) {
    try {
        let { userId, description, duration } = req.body

        if (userId && description && duration) {
            new Exercise(req).save(res)
        } else {
            res.json({ error: 'Please fill out all the fields!' })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = addExercise
