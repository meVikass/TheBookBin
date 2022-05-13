const express = require("express");
let router = express.Router();
let User = require("../models/user");

// Post call to the api endpoint /users/register.

router.post("/register", (req, res, next) => {
  let user = new User({
    email: req.body.email,
    userName: req.body.userName,
    password: User.hashPassword(req.body.password),
    creationDate: Date.now(),
  });

  user
    .save()
    .then((doc) => {
      return res.status(201).json(doc);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Error while registration" });
    });
});
module.exports = router;
