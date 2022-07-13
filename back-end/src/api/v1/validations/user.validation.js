const joi = require('joi')

const userValidate = (data) => {
    const userSchema = joi.object({
        userName: joi.string().lowercase().required(),
        password: joi.string().min(6).max(32).required(),
        email: joi.string(),
    })
    return userSchema.validate(data)
}

module.exports = userValidate
