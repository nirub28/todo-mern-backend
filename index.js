const express = require('express');

const dotenv = require ('dotenv'); // env variables
dotenv.config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();
const PORT = process.env.PORT;


//The database connection
const db = require("./config/mongoose.js");

const cors = require('cors');
app.use(cors());

//Routes
app.use("/", require("./routes"));


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
