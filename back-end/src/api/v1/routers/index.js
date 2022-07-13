const express = require('express')
const api = express.Router()

api.get('/', (req, res) => {
    res.send('API page')
})

module.exports = api
