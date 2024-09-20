const joi = require('joi')

class TodoValidator {

    constructor() { }

    validateToDoCreation = () => {
        return joi.object({
            title: joi.string().required(),
            description: joi.string().optional()
        })
    }

}
module.exports = new TodoValidator()
