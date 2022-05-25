const express = require("express");
let router = express.Router();
let User = require("../models/user");
let jwt = require("jsonwebtoken");
let nodemailer = require("nodemailer");

// @desc This will add a new user in the Database.
// @route POST users/register
router.post("/register", (req, res, next) => {
  console.log("users/register");
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
      sendConfirmationMail(doc.email);
      return res.status(201).json(doc);
    })
    .catch((err) => {
      console.log(err);
      return res.status(501).json({ message: "Error while registration" });
    });
});

// @desc This function will automatically send confirmation mail to the user.
function sendConfirmationMail(userMail) {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "thebookbin@hotmail.com",
      pass: "Password@33",
    },
  });

  let mailOptions = {
    from: "thebookbin@hotmail.com",
    to: userMail,
    subject: "The Book Bin - Registration Confirmation",
    text: `Hola, Welcome to your new The Book Bin account.
Book Bin lets you stay connected, organized, and productive—at reading books.
Thank You.`,
  };

  transporter.sendMail(mailOptions, (info, error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("confirmation email sent. ", info.response);
    }
  });
}

// @desc When a user will try to login in our application.
// @route POST users/login
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
              isAdmin: doc.isAdmin,
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

// @desc If the token is already saved in the localstorage of the browser
// @route GET users/user-details
router.get("/user-details", verifyToken, (req, res, next) => {
  return res.status(200).json(decryptedToken);
});

// @desc This function will run as it is a middleware (this will check if the token is verified).
let decryptedToken = "";
function verifyToken(req, res, next) {
  let token = req.query.token;
  jwt.verify(token, "secret", (err, tokenData) => {
    if (err) {
      return res.status(400).json({ message: "unauthorized request" });
    }
    if (token) {
      decryptedToken = jwt.decode(token);
      next();
    }
  });
}

router.get("/all-users", (req, res, next) => {
  User.find()
    .then((doc) => {
      return res.status(200).json(doc);
    })
    .catch((err) => {
      return res.status(500).json({ message: "some error occured" });
    });
});


module.exports = router;
