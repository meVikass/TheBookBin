// The Book Bin [Training Project]
// Team - DEV-3 [Jyoti Sinha, Shivangi Shivhare, Akrish Kumar Singh, Kritika Singh, Sourabh Rana]
// Created by - Vikas Sharma
// Employee Id- 2097600

const express = require("express");
let router = express.Router();
let Order = require("../models/order");
const axios = require("axios");

// @desc When a user will buy a new book from the cart.
// @route POST order/add
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

// @desc This will return all purchased books for a particular user.
// @route POST favorite-books/add
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

// @desc This will return an array of book objects.
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
