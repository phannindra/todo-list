const { logger } = require('../../logger.js')
const todoValidator = require('./../validators/todo-validator.js')
const todoService = require('./../services/todo-service.js')
const responseHandler = require('../utils/response-handlers.js')
const { STATUS_CODES } = require('./../utils/consts.js')
class TodoController {

    constructor() {
    }

    createToDoItem = async (req, res) => {
        logger.debug(`Creating todo item: ${JSON.stringify(req.body)}`)
        const schema = todoValidator.createToDo()
        const { error, value } = schema.validate(req.body)
        if (error) {
            logger.error(error)
            responseHandler(res, error, STATUS_CODES.BAD_REQUEST)
            return
        }
        const newTodoItemId = await todoService.createTodoItem(value, res)
        responseHandler(res, { id: newTodoItemId }, STATUS_CODES.CREATED)
    }

    getToDoItem = async (req, res) => {
        logger.debug(`fetching todo item ${JSON.stringify(req.query)}`)
        const schema = todoValidator.validateTodoId()
        const { error, value } = schema.validate(req.query)
        if (error) {
            logger.error(error)
            responseHandler(res, error, STATUS_CODES.BAD_REQUEST)
            return
        }
        const todoItem = await todoService.getTodoItem(value.id)
        responseHandler(
            res, todoItem,
            !todoItem ? STATUS_CODES.NOT_FOUND : STATUS_CODES.OK)
    }

    updateToDoItem = async (req, res) => {
        logger.debug(`updating todo item ${JSON.stringify(req.body)}`)
        const schema = todoValidator.updateToDo()
        const { error, value } = schema.validate(req.body)
        if (error) {
            logger.error(error)
            responseHandler(res, error, STATUS_CODES.BAD_REQUEST)
            return
        }
        const updationStatus = await todoService.updateTodoItem(value, res)
        const updateSuccessful = updationStatus[0]
        if (updateSuccessful)
            responseHandler(res, { 'message': 'Todo item updated' }, STATUS_CODES.OK)
        else
            responseHandler(res, { 'message': 'Todo item not found' }, STATUS_CODES.NOT_FOUND)
    }

    deleteToDoItem = async (req, res) => {
        logger.debug(`deleting todo item ${JSON.stringify(req.query)}`)
        const schema = todoValidator.validateTodoId()
        const { error, value } = schema.validate(req.query)
        if (error) {
            logger.error(error)
            responseHandler(res, error, STATUS_CODES.BAD_REQUEST)
            return
        }
        const deletionStatus = await todoService.deleteTodoItem(value.id)
        if (deletionStatus)
            responseHandler(res, { message: 'Todo deleted' }, STATUS_CODES.OK)
        else
            responseHandler(res, { message: 'Todo not found' }, STATUS_CODES.NOT_FOUND)

    }

    getAllTodos = async (req, res) => {
        logger.debug('Fetching all the items')
        responseHandler(res, await todoService.getAllItems(), STATUS_CODES.OK)
    }
}
module.exports = new TodoController()