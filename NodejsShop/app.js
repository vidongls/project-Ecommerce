const express = require('express')
const dbConfig = require('./app/config/config')
const userRoutes = require('./app/routes/user-routes')
const productRoutes = require('./app/routes/product-routes')
const app = express()

dbConfig()
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to NewsApp application.' })
})

app.use('/user', userRoutes)
app.use('/product', productRoutes)

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})
