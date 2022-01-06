const Product = require('../models/product-model')
const asyncHandler = require('express-async-handler')
// Create and Save a new product
const create = asyncHandler(async (req, res) => {
    // Validate request
    console.log(123)
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    const { tittle, description, urlImage, count } = req.body

    //   return;
    // Create a product
    const productCreated = new Product({
        tittle,
        description,
        urlImage,
        count,
    })

    try {
        await productCreated.save()
    } catch (error) {
        console.log(error)
        throw new Error('Error create product failed')
    }
    res.status(201).json(productCreated)
    // Save product in the database
})

const getAll = async (req, res) => {
    let productData = []
    try {
        productData = await Product.find({})
    } catch (error) {
        throw new Error('Error getAll product failed')
    }

    res.status(200).json(productData)
}

const updateProduct = async (req, res) => {
    const { id, title, description, urlImage, count } = req.body

    const product = await Product.findById(id)

    if (product) {
        product.title = title
        product.description = description
        product.urlImage = urlImage
        product.count = count
        const productUpdated = await product.save()
        res.status(200).json(productUpdated)
    } else {
        res.status(400)
        throw new Error('Update failed')
    }
}

const findProductById = async (req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(400)
        throw new Error('Error failed')
    }
}

const deleteProductById = async (req, res) => {
    const { id } = req.params

    try {
        const product = await Product.findById(id)
        if (product) {
            await product.remove()
            res.json({ message: 'Deleted' })
        } else {
            res.status(400)
            throw new Error('Delete failed')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Error failed')
    }
}

module.exports = {
    create,
    getAll,
    updateProduct,
    findProductById,
    deleteProductById,
}
