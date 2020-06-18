let mongoose = require('mongoose')
require('dotenv').config()

const { log } = console
const MONGO_URI = process.env.MONGO_URI

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            })
            .then(function () {
                log('Successfully connected to database!')
            })
            .catch(function (err) {
                log('Failed connection to the database!', err)
            })
    }
}

module.exports = new Database()
