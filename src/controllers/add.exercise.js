const Exercise = require('../exercise')

function addExercise(req, res) {
    try {
        let { userId, description, duration, date } = req.body

        if (date.length && !Date.parse(date)) {
            res.json({ error: 'Invalid date!' })
        } else {
            if (userId && description && duration) {
                let newSession = new Exercise(req)
                newSession.save(res)
            } else {
                res.json({ error: 'Please fill out all the fields!' })
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = addExercise
