const { logger } = require('../../logger.js')
const { todo } = require('./../models/')
class TodoService {

    createTodoItem = async (payload, res) => {
        logger.debug('Creating a todo item', JSON.stringify(payload))
        const todoItem = await todo.create({
            title: payload.title,
            description: payload.description
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

    updateTodoItem = async (payload, res) => {
        logger.debug('Updating todo Item', JSON.stringify(payload))
        const todoItem = todo.update(
            payload,
            {
                where: {
                    id: payload.id
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
        return deletionStatus
    }

    getAllItems = async (req, res) => {
        logger.debug('Getting all the matching todo items')
        return await todo.findAll()
    }
}
module.exports = new TodoService()