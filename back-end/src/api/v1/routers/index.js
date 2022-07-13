const express = require('express')
const api = express.Router()
const userRouter = require('./user.router')

api.get('/', (req, res, next) => {
    res.send('API page')
})

userRouter(api)

module.exports = api
