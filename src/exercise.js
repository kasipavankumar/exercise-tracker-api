const user = require('../src/models/user.model')

/**
 * Exercise container to handle related methods.
 */
class Exercise {
    constructor(userId, description, duration, date) {
        this.userId = userId
        this.description = description
        this.duration = duration
        this.date = date.length
            ? new Date(date).toDateString()
            : new Date().toDateString()
    }
}

/**
 * Validate & write exercise log to the database.
 * @param {Response} res
 */
Exercise.prototype.save = function (res) {
    let { userId, description, duration, date } = this

    user.findById(userId, function (err, doc) {
        if (err) {
            res.json({ error: 'Could not get user!' })
        }

        let { log } = doc

        log.unshift({
            description: description,
            duration: duration,
            date: date,
        })

        doc.count = log.length

        doc.save(function (err, doc) {
            if (err) {
                res.json({ error: 'Could not update!' })
            }

            let { description, duration, date } = log[0]

            res.json({
                userId: doc._id,
                description: description,
                duration: duration,
                date: date,
                username: doc.username,
            })
        })
    })
}

/**
 * Static method to get the exercise log of a user by ID.
 * @static
 * @param {string} id
 * @param {Response} res
 */
Exercise.getLogById = function (req, res) {
    let { userId, from, to, limit } = req.query

    user.findById(userId, function (err, doc) {
        if (err) {
            res.json({ error: 'Could not get the user!' })
        } else if (!doc) {
            res.json({ error: 'No such user!' })
        } else {
            let { log } = doc

            let cleanLog = log.map(function (each) {
                return {
                    description: each.description,
                    duration: each.duration,
                    date: each.date,
                }
            })

            let filteredLog = log.filter(function (each) {
                return (
                    Date.parse(each.date) >= Date.parse(from) &&
                    Date.parse(each.date) < Date.parse(to)
                )
            })

            filteredLog.length
                ? res.json({
                      userId: doc._id,
                      username: doc.username,
                      from: new Date(from).toDateString(),
                      to: new Date(to).toDateString(),
                      log: filteredLog,
                  })
                : res.json({
                      _id: doc._id,
                      username: doc.username,
                      count: doc.count,
                      log: cleanLog,
                  })
        }
    })
}

module.exports = Exercise
