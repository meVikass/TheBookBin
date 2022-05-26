const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://sharma123:sharma123@myfirstcluster.95a96.mongodb.net/thebookbin?retryWrites=true&w=majority"
);

let bodyParser = require("body-parser");
const cors = require("cors");

const express = require("express");
const app = express();

let usersRouter = require("./routes/users");
let bookRouter = require("./routes/books");
let favoriteRouter = require("./routes/favorite");
let orderRouter = require("./routes/orders");

// constant port no.
const PORT = 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/users", usersRouter);
app.use("/books", bookRouter);
app.use("/favorite-books", favoriteRouter);
app.use("/order", orderRouter);

app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running on port " + PORT);
});
