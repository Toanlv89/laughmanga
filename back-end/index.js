const express = require('express')
const app = express()
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const vhost = require('vhost')
const api = require('./src/api/v1/routers/index')
const mongoose = require('mongoose')
const createError = require('http-errors')
const cors = require('cors')

dotenv.config()
app.set('port', process.env.PORT || 8000)

app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(vhost('api.*', api))

// connect to Database
mongoose
    .connect(process.env.MONGODB_URL)
    .then((result) => {
        console.log('Connect to MongoDB successfully!')
    })
    .catch((err) => {
        console.error('Connect to MongoDB failed!', err)
    })

// Home page
app.get('/', (req, res) => {
    res.send('api/localhost:' + app.get('port'))
})

// API path
app.use(api)

// Catch error 404 and 500
app.use((err, req, res, next) => {
    next(createError.InternalServerError('500'))
})

app.use((req, res, next) => {
    next(createError.NotFound('404'))
})

// Run server
app.listen(app.get('port'), function () {
    console.log(
        'Express started on http://localhost:' +
            app.get('port') +
            '; press Ctrl-C to terminate',
    )
})
