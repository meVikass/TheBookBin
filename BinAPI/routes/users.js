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
          let token = jwt.sign(
            {
              userId: doc._id,
              userName: doc.userName,
            },
            "secret",
            {
              expiresIn: "3h",
            }
          );
          res.status(200).json(token);
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
router.get("/user-details", verifyToken, (req, res, next) => {
  return res.status(200).json(theToken);
});
let theToken = "";

function verifyToken(req, res, next) {
  let token = req.query.token;

  jwt.verify(token, "secret", (err, tokenData) => {
    if (err) {
      return res.status(400).json({ message: "unauthorized request" });
    }
    if (token) {
      console.log("token in verfiy token");
      theToken = jwt.decode(token);
      console.log(theToken);
      next();
    }
  });
}

module.exports = router;
