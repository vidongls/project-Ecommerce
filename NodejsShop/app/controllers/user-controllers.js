const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')

const register = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    const {
        userName,
        password,
        confirmPassword,
        email,
        phone,
        firstName,
        lastName,
    } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    console.log(req.body)

    const user = await User.create({
        userName,
        password,
        confirmPassword,
        email,
        phone,
        firstName,
        lastName,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
            phone: user.phone,
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})

const login = asyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        })
    }

    const { userName, password } = req.body

    const user = await User.findOne({ userName })

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (user && passwordMatch) {
        res.status(200).json(user)
    } else {
        res.status(400)
        throw new Error('Username or password is incorrect')
    }
})

module.exports = { register, login }
