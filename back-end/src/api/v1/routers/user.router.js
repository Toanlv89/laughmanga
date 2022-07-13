const user = require('../models/user.model')
const joi = require('joi')
const userValidate = require('../validations/user.validation')

module.exports = (router) => {
    router.post('/register', async (req, res, next) => {
        try {
            const {value, error} = userValidate(req.body)
            if (error) {
                res.type('json').status(400).send({
                    error: 'Bad Request',
                    message: error.details[0].message,
                    statusCode: 400,
                })
            }

            const {userName, password} = value
            isExist = await user.findOne({
                userName,
            })

            if (isExist) {
                res.type('json')
                    .status(409)
                    .send({
                        error: 'Conflict',
                        message: `${userName} has been registered!`,
                        statusCode: 409,
                    })
            }

            const newUser = await user.create({
                userName,
                password,
            })

            return res.json({
                status: 'Account is created successfully!',
                data: newUser,
            })
        } catch (error) {
            next(error)
        }
    })

    router.get('/refesh-token', (req, res, next) => {
        res.send('refesh-token function')
    })

    router.post('/login', (req, res, next) => {
        res.send('login function')
    })

    router.get('/logout', (req, res, next) => {
        res.send('logout function')
    })
}
