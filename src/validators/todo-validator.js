const joi = require('joi')

class TodoValidator {

    constructor() { }

    createToDo = () => {
        return joi.object({
            title: joi.string().required(),
            description: joi.string().optional()
        })
    }

    updateToDo = () => {
        return joi.object({
            id: joi.string().guid({
                version: [
                    'uuidv4',
                    'uuidv5'
                ]
            }).required(),
            title: joi.string().required(),
            description: joi.string().optional()
        })
    }

    validateTodoId = () => {
        return joi.object({
            id: joi.string().guid({
                version: [
                    'uuidv4',
                    'uuidv5'
                ]
            }).required()
        })
    }

}
module.exports = new TodoValidator()
