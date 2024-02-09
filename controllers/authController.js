const jwt = require("jsonwebtoken");
const User = require("../model/User");

// Username availability check
module.exports.checkUsernameAvailability = async function (req, res) {
  try {
    const { username } = req.body;

    // Checking if a user with the given username exists in the database
    const existingUser = await User.findOne({ username: username });

    // Return a response indicating the availability status of the username
    res.json({ available: !existingUser });
  } catch (error) {
    console.error("Error checking username availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handle user registration
module.exports.signup = async function (req, res) {
  try {
    const { username, password, confirmPassword } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Username is already taken",
      });
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and Confirm Password do not match",
      });
    }

    // Create a new user
    const newUser = await User.create({ username, password });
    res.json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};


module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};