const express = require('express');
const router = express.Router();

// Todo controller
const todoController = require('../controllers/todoController');

// Routes
router.get('/todos', todoController.getAllTodos);
router.post('/add', todoController.addTodo);
router.delete('/delete/:id', todoController.deleteTodo);
router.put('/update/:id', todoController.updateTodo);

module.exports = router;
