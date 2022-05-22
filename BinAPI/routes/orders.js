const express = require("express");
let router = express.Router();
let Order = require("../models/order");
const axios = require("axios");

router.post("/add", (req, res, next) => {
  let order = new Order({
    bookId: req.body.bookId,
    userId: req.body.userId,
  });

  order
    .save()
    .then((doc) => {
      return res.status(201).json(doc);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Error occured" });
    });
});

router.get("/all/:userId", (req, res, next) => {
  let data = [];
  Order.find({ userId: req.params.userId })
    .then((doc) => {
      sendGetRequest(doc)
        .then((data) => {
          return res.status(200).json(data);
        })
        .catch((ero) => {
          console.log("Some error occured");
        });
    })
    .catch((err) => {
      return res.status(501).json({ message: "Error occured" });
    });
});

const sendGetRequest = async (doc) => {
  let data = [];
  for (let obj of doc) {
    await axios
      .get(`http://localhost:3000/books/${obj.bookId}`)
      .then((res) => {
        data.push(res.data);
      })
      .catch((err) => {
        console.log("ERRRRRRRRRR..");
      });
  }
  return data;
};

module.exports = router;
