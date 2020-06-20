const mongoose = require('mongoose')
require('dotenv').config()

class Database {
    constructor() {
        this.MONGO_URI = process.env.MONGO_URI
        this.db = mongoose.connection
        this._connect()
    }

    _connect() {
        mongoose
            .connect(this.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            })
            .catch(function (error) {
                console.error(`Connection to the database failed: ${error}`)
            })

        this.db.on('error', function (error) {
            console.error(`Connection error: ${error}`)
        })

        this.db.once('open', function () {
            console.info(`Connection to database opened.`)
        })
    }
}

module.exports = new Database()
