const User = require("../model/User");

module.exports.getAllTodos = async function (req, res) {
  const { username } = req.params;

  // console.log("name", username)
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return the todos for the user
    res.json(user.todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.addTodo = async function (req, res) {
  const { username } = req.params;
  const { text } = req.body;

  // console.log("det", username, text );
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // console.log("user",user );

    // Create a new todo object
    const newTodo = {
      text: text,
      completed: false,
    };

    // console.log("new todo",newTodo );

    // Add the new todo to the user's todos array
    user.todos.push(newTodo);

    // Save the updated user object
    const updatedUser = await user.save();

    // Get the ID of the last added todo
    const newTodoId = updatedUser.todos[updatedUser.todos.length - 1]._id;

    // Find the newly added todo by its ID
    const addedTodo = updatedUser.todos.find(todo => todo._id === newTodoId);

    // Return the newly added todo
    res.status(201).json(addedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.deleteTodo = async function (req, res) {
  const { id } = req.params;
  const { username } = req.query;

  // console.log("check backend" , username);

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out the todo to be deleted
    user.todos = user.todos.filter((todo) => todo._id.toString() !== id);

    // Save the updated user object
    await user.save();

    // Return success message
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.toggleTodoCompletion = async function (req, res) {
  const { id } = req.params;
  const { username } = req.query;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the todo by id
    const todo = user.todos.find((todo) => todo._id.toString() === id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Toggle the completed status of the found todo
    todo.completed = !todo.completed;

    // Save the updated user object
    await user.save();

    res
      .status(200)
      .json({ message: "Todo completion status toggled successfully", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update todo order controller
module.exports.updateTodoOrder = async function (req, res) {
  const { username } = req.params;
  const { todos } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the order of todos
    user.todos = todos;

    // Save the updated user object
    await user.save();

    res.status(200).json({ message: "Todo order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
