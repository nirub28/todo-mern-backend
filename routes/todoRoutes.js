const express = require('express');
const router = express.Router();

// Todo controller
const todoController = require('../controllers/todoController');

// Routes
router.get('/todos/:username', todoController.getAllTodos);
router.post('/add/:username', todoController.addTodo); 
router.delete('/delete/:id', todoController.deleteTodo);
router.put('/complete/:id', todoController.toggleTodoCompletion);
router.put('/updateOrder/:username', todoController.updateTodoOrder);

module.exports = router;
