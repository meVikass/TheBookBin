// The Book Bin [Training Project]
// Team - DEV-3 [Jyoti Sinha, Shivangi Shivhare, Akrish Kumar Singh, Kritika Singh, Sourabh Rana]
// Created by - Vikas Sharma
// Employee Id- 2097600

const express = require("express");
let router = express.Router();
let Book = require("../models/book");
const axios = require("axios");

// @desc When a new book will be added in the database.
// @route POST books/new-book
router.post("/new-book", (req, res, next) => {
  let book = new Book({
    bookName: req.body.bookName,
    authorName: req.body.authorName,
    genres: req.body.genres,
    price: req.body.price || null,
    year: req.body.year || null,
    rating: req.body.rating || null,
    pageCount: req.body.pageCount || null,
    creationDate: Date.now(),
    imagePath: req.body.imagePath,
  });

  book
    .save()
    .then((doc) => {
      return res.status(201).json(doc);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Error occured" });
    });
});

// @desc This will return all the books inside the database (whole book data).
// @route GET books/all
router.get("/all", (req, res, next) => {
  Book.find()
    .then((doc) => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch((err) => {
      return res.status(501).json({ message: "Error occured" });
    });
});

// @desc This will return a particular book that have a unique id (helps in searching a book).
// @route GET books/:bookId  (bookId is a variable that will hold the actual id of the book).
router.get("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error occured" });
    });
});

// @desc This will update the details of a particular book.
// @route PATCH books/:bookId (bookId is a variable).
router.patch("/:bookId", (req, res, next) => {
  Book.findByIdAndUpdate(req.params.bookId, req.body)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error occured" });
    });
});

module.exports = router;
