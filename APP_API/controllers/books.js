const mongoose = require('mongoose');

const Book = mongoose.model('Book');

const bookslist = (req, res) => {
    Book.find()
        .exec((err, bookdata) => {
            if (err) {
                res
                    .status(404)
                    .json(err);
                return;
            }
            res
                .status(200)
                .json(bookdata);
        });
};

const booksCreate = (req, res) => {


    let { title, author, publisher, price, image } = req.body;

    if (!title || !author || !publisher || !price) {
        return res.status(400).json({ message: "All Fields required" });
    }

    if (image) {
        image = mongoose.Types.ObjectId(image);
    }

    Book.create({
        title, author, publisher, price: parseFloat(price), image
    }, (err, bookdata) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(bookdata);
        }
    })
};

const booksReadOne = (req, res) => {
    const bookid = req.params.bookid;

    if (bookid) {
        Book.findById(bookid)
            .exec((err, book) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                if (book) {
                    res
                        .status(200)
                        .json(book);
                } else {
                    res
                        .status(404)
                        .json({ message: "Not Found." });
                }
            })
    } else {
        res
            .status(404)
            .json({ message: "No bookid" });
    }
};

const booksUpdateOne = (req, res) => {
    if (!req.params.bookid) {
        res
            .status(404)
            .json({
                message: "Not found, bookid is required."
            });
        return;
    }

    Book.findById(req.params.bookid)
        .exec((err, bookdata) => {
            if (!bookdata) {
                res
                    .status(404)
                    .json({
                        message: "bookid not found"
                    });
                return;
            } else if (err) {
                res
                    .status(400)
                    .json(err);
                return;
            }
            const { title, author, publisher, price, image } = req.body;

            if (!title || !author || !publisher || !price || !image) {
                return res.status(400).json({ message: "All Fields required" });
            }

            bookdata.title = title;
            bookdata.author = author;
            bookdata.publisher = publisher;
            bookdata.price = parseFloat(price);
            bookdata.image = image;

            bookdata.save((err, bookdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(bookdata);
                }
            });
        });
};

const booksDeleteOne = (req, res) => {
    const bookid = req.params.bookid;

    if (bookid) {
        Book
            .findByIdAndRemove(bookid)
            .exec((err, bookdata) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(204)
                    .json(null);
            });

    } else {
        res
            .status(404)
            .json({ message: "No bookid" });
    }
};

module.exports = {
    booksDeleteOne,
    booksUpdateOne,
    bookslist,
    booksReadOne,
    booksCreate
};