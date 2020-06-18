const User = require('../user')

function addUser(req, res) {
    try {
        let { username } = req.body

        if (username.length) {
            new User(username).save(res)
        } else {
            res.json({ error: 'Username cannot be empty!' })
        }
    } catch (err) {
        res.json({ error: 'Unable to create a user!' })
    }
}

module.exports = addUser
