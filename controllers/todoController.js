// Importing Todo model
const Todo = require('../model/User');

module.exports = {
  async getAllTodos(req, res) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async addTodo(req, res) {
    const todo = new Todo({
      text: req.body.text,
    });

    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async deleteTodo(req, res) {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateTodo(req, res) {
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true });
      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
