const User = require('../user')

function getUsers(req, res) {
    try {
        User.getAllUsers(res)
    } catch (err) {
        console.log(err)
    }
}

module.exports = getUsers
