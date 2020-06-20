const user = require('../src/models/user.model')

/**
 * Exercise container to handle related methods.
 */
class Exercise {
    /**
     * @constructor
     * @param {Request} request - The request object.
     */
    constructor(request) {
        let { userId, description, duration, date } = request.body

        this.userId = userId
        this.description = description
        this.duration = parseInt(duration)
        this.date = date ? new Date(date) : new Date()
    }
}

/**
 * Validate & write the exercise log to database.
 * @param {Response} res - Response to be sent to client.
 */
Exercise.prototype.save = function (res) {
    let { userId, description, duration, date } = this

    user.findById(userId, function (err, doc) {
        if (err) {
            res.json({
                error:
                    'There was an error while getting user. Please try again.',
            })
        } else if (!doc) {
            res.json({ error: 'Invalid User ID.' })
        } else {
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
                    _id: doc._id,
                    description: description,
                    duration: duration,
                    date: new Date(date).toDateString(),
                    username: doc.username,
                })
            })
        }
    })
}

/**
 * Static method to get the exercise log of a user by ID.
 * @static
 * @param {Request} req - Request object to extract the query fields.
 * @param {Response} res - Response object to be sent to client.
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

            log.sort(function (a, b) {
                return Date.parse(b.date) - Date.parse(a.date)
            })

            let cleanLog = log.map(function (each) {
                return {
                    description: each.description,
                    duration: each.duration,
                    date: new Date(each.date).toDateString(),
                }
            })

            if (limit) {
                cleanLog = cleanLog.slice(0, parseInt(limit))
            }

            if (from || to) {
                let filteredLog = log.filter(function (each) {
                    return from && !to
                        ? Date.parse(each.date) >= Date.parse(from)
                        : Date.parse(each.date) >= Date.parse(from) &&
                              Date.parse(each.date) <= Date.parse(to)
                })

                if (limit) {
                    filteredLog = filteredLog.filter(function (_, index) {
                        return index < parseInt(limit)
                    })
                }

                filteredLog = filteredLog.map(function (each) {
                    return {
                        description: each.description,
                        duration: each.duration,
                        date: new Date(each.date).toDateString(),
                    }
                })

                from && !to
                    ? res.json({
                          _id: doc._id,
                          username: doc.username,
                          from: new Date(from).toDateString(),
                          count: filteredLog.length,
                          log: filteredLog,
                      })
                    : res.json({
                          _id: doc._id,
                          username: doc.username,
                          from: new Date(from).toDateString(),
                          to: new Date(to).toDateString(),
                          count: filteredLog.length,
                          log: filteredLog,
                      })
            } else {
                res.json({
                    _id: doc._id,
                    username: doc.username,
                    count: cleanLog.length,
                    log: cleanLog,
                })
            }
        }
    })
}

module.exports = Exercise
