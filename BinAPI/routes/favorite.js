// The Book Bin [Training Project]
// Team - DEV-3 [Jyoti Sinha, Shivangi Shivhare, Akrish Kumar Singh, Kritika Singh, Sourabh Rana]
// Created by - Vikas Sharma
// Employee Id- 2097600

const express = require("express");
let router = express.Router();
let Favorite = require("../models/favorite");
const axios = require("axios");

// @desc When a new book will be added in the favorite collection
// @route POST favorite-books/add
router.post("/add", (req, res, next) => {
  let favoriteBook = new Favorite({
    bookId: req.body.bookId,
    userId: req.body.userId,
  });

  favoriteBook
    .save()
    .then((doc) => {
      return res.status(201).json(doc);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Error occured" });
    });
});

// @desc This will return all favorite books of a particuler user.
// @route GET favorite-books/all/:userId (userId is a variable that will hold the actual user id).
router.get("/all/:userId", (req, res, next) => {
  let data = [];
  Favorite.find({ userId: req.params.userId })
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

// @desc This will delete a book that was added in the favorite collection.
// @route POST favorite-books/delete
router.post("/delete", (req, res, next) => {
  Favorite.findOneAndDelete({
    bookId: req.body.bookId,
    userId: req.body.userId,
  })
    .then((doc) => {
      return res.status(200).json(doc);
    })
    .catch((err) => {
      console.log("ERRRR.....");
    });
});

module.exports = router;
