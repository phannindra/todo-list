const { logger } = require('../../logger.js')
const { todo } = require('./../models/')
class TodoService {

    createTodoItem = async (req, res) => {
        logger.debug('Creating a todo item', JSON.stringify(req.body))
        const todoItem = await todo.create({
            title: req.body.title,
            description: req.body.description
        })
        logger.debug('Todo item id:', JSON.stringify(todoItem.dataValues.id))
        return todoItem.dataValues.id
    }

    getTodoItem = async (id) => {
        logger.debug('Fetching todo Item ', id)
        const todoItem = await todo.findOne({
            where: {
                id: id
            }
        })
        return todoItem
    }

    updateTodoItem = async (req, res) => {
        logger.debug('Updating todo Item', JSON.stringify(req.body))
        const todoItem = todo.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }
        )
        return todoItem
    }

    deleteTodoItem = async (id) => {
        logger.debug(`deleting todo item ${id}`)
        const deletionStatus = await todo.destroy({
            where: {
                id
            }
        })
        logger.debug(`todo item deletion status ${deletionStatus}`)

    }

    getAllItems = async (req, res) => {
        logger.debug('Getting all the matching todo items')
        return await todo.findAll()
    }
}
module.exports = new TodoService()