const mongoose = require('mongoose')
const { Schema } = mongoose

const productModel = new Schema({
    tittle: String,
    description: String,
    urlImage: String,
    count: String,
})

module.exports = mongoose.model('Products', productModel)
