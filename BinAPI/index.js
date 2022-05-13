let usersRouter = require("./routes/users");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BookBin");

let bodyParser = require("body-parser");

const cors = require("cors");

const express = require("express");
const app = express();

// constant port no.
const PORT = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
