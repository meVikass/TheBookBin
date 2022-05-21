const express = require("express");
let router = express.Router();
let User = require("../models/user");
let jwt = require("jsonwebtoken");

// Post call to the api endpoint /users/register.

router.post("/register", (req, res, next) => {
  let user = new User({
    email: req.body.email,
    userName: req.body.userName,
    password: User.hashPassword(req.body.password),
    creationDate: Date.now(),
    isAdmin: req.body.isAdmin || false,
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

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((doc) => {
      if (doc) {
        if (doc.isValid(req.body.password)) {
          // generate token
          let token = jwt.sign(
            {
              userName: doc.userName,
            },
            "secretkey",
            {
              expiresIn: "1d",
            }
          );

          res.status(200).json(doc);
        } else {
          return res.status(501).json({ message: "Invalid Password" });
        }
      } else {
        return res
          .status(501)
          .json({ message: "User email address not registered" });
      }
    })
    .catch((err) => {
      return res.status(501).json({ message: "some internal error" });
    });
});

module.exports = router;
