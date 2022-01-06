var mongoose = require('mongoose')

const url = 'mongodb://localhost:27017/dbmotor'

const dbconfig = async () => {
    try {
        const conn = await mongoose.connect(url)
        console.log('Server connected ' + conn.connection.host)
    } catch (error) {
        console.log(error)
        process.exit()
    }
}

module.exports = dbconfig
