const express = require('express')
const app = express()
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const vhost = require('vhost')
const api = require('./src/api/v1/routers/index')
const mongoose = require('mongoose')
const cors = require('cors')

dotenv.config()
app.set('port', process.env.PORT || 8000)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(morgan('dev'))

// connect to Database
mongoose
    .connect(process.env.MONGODB_URL)
    .then((result) => {
        console.log('Connect to MongoDB successfully!')
    })
    .catch((err) => {
        console.error('Connect to MongoDB failed!', err)
    })

// API path
app.use(vhost('api.*', api))

// Home page
app.get('/', (req, res) => {
    res.send('Go to url: api.localhost:' + app.get('port'))
})

// Catch error 404 and 500
app.use((req, res, next) => {
    res.type('json').status(404).send({
        error: 'Not Found',
        message: "This page isn't found!",
        statusCode: 404,
    })
})

app.use((err, req, res, next) => {
    res.type('json').status(500).send({
        error: 'Internal Server Error',
        message: 'Server Error!',
        statusCode: 500,
    })
})

// Run server
app.listen(app.get('port'), function () {
    console.log(
        'Express started on http://localhost:' +
            app.get('port') +
            '; press Ctrl-C to terminate',
    )
})
