const express = require('express')
const {
    create,
    getAll,
    updateProduct,
    findProductById,
    deleteProductById,
} = require('../controllers/product-controller')

const router = express.Router()

router.post('/create', create)
router.get('/getAll', getAll)
router.put('/update', updateProduct)
router.get('/findOne/:id', findProductById)
router.delete('/deleteOne/:id', deleteProductById)

module.exports = router
