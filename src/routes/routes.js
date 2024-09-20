const todoController = require('./../controllers/todo-controller.js')

module.exports = function routes(app) {
    app.post('/note', (req, res) => {
        todoController.createToDoItem(req, res)
    })
    app.get('/note', (req, res) => {
        todoController.getToDoItem(req, res)
    })
    app.put('/note', (req, res) => {
        todoController.updateToDoItem(req, res)
    })
    app.delete('/note', (req, res) => {
        todoController.deleteToDoItem(req, res)
    })
    app.get('/notes', (req, res) => {
        todoController.getAllTodos(req, res)
    })
}
