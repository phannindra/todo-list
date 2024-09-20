const { logger } = require('../../logger.js')
const todoValidator = require('./../validators/todo-validator.js')
const todoService = require('./../services/todo-service.js')

class TodoController {

    constructor() {
    }

    createToDoItem = async (req, res) => {
        logger.debug(`Creating todo item: ${JSON.stringify(req.body)}`)
        const schema = todoValidator.validateToDoCreation()
        const { error, value } = schema.validate(req.body)
        if (error) {
            logger.error(error)
            res.send(error.message)
            return
        }

        logger.debug(JSON.stringify(value))
        res.send(
            {
                id: await todoService.createTodoItem(req, res)
            }
        )
    }

    getToDoItem = async (req, res) => {
        logger.debug(`fetching todo item ${JSON.stringify(req.query)}`)
        res.send(
            await todoService.getTodoItem(req.query.id)
        )
    }

    updateToDoItem = async (req, res) => {
        logger.debug(`updating todo item ${JSON.stringify(req.body)}`)
        await todoService.updateTodoItem(req, res)
        res.send('Todo item updated')
    }

    deleteToDoItem = async (req, res) => {
        logger.debug(`deleting todo item ${req.query}`)
        res.send(await todoService.deleteTodoItem(req.query.id))
    }

    getAllTodos = async (req, res) => {
        logger.debug('Fetching all the items')
        res.send(await todoService.getAllItems())
    }
}
module.exports = new TodoController()