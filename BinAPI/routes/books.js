const express = require("express");
let router = express.Router();
let Book = require("../models/book");
const axios = require("axios");

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

router.get("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error occured" });
    });
});

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
