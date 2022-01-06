const mongoose = require('mongoose')

const { Schema } = mongoose

const loginSchema = new Schema({
    userName: { type: String, default: '' },
    password: { type: String, default: '' },
})

module.exports = mongoose.model('login', loginSchema, 'login')
