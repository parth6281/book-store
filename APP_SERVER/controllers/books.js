const request = require('request');
const fs = require('fs');
const path = require('path');
const { NetworkAuthenticationRequire } = require('http-errors');

const apiOptions = {
    server: 'http://localhost:3000'
};


const booklist = (req, res) => {

    const path = '/api/books';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {}
    };

    request(
        requestOptions,
        (err, { statusCode }, body) => {
            let books = body;
            books.forEach(book => {
                book.src = book.image ? `/images/${book.image}` : `/images/placeholder.jpg`;
            })
            if (statusCode == 200) {
                return res.render('list-display.pug', { title: 'Books', books });
            }
        }
    )
}

const bookDetails = (req, res, next) => {
    let bookid = req.params.bookid;

    if (!bookid) {
        res.locals.message = 'Oops! Bad Request.';
        res.locals.error = { stack: '', status: 400 }
        res.render('error');
        return
    }

    const path = `/api/books/${bookid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
        qs: {}
    };

    request(
        requestOptions,
        (err, { statusCode }, book) => {
            if (statusCode != 200) {
                // To be implemented
                res.locals.message = 'Oops! Bad Request.';
                res.locals.error = { stack: '', status: 400 }
                res.render('error');
                next();
                return
            }
            else {
                book.src = `/images/${book.image}`;
                res.render('details.pug', { book, title: 'Book Store' });
            }
        }
    )
}

function requestFileCreation(req, res, cb) {
    let api_path = `/api/images`;

    let requestOptions = {
        url: `${apiOptions.server}${api_path}`,
        method: 'POST',
        qs: {},
        headers: {
            "Content-Type": req.file.mimetype
        },
        body: fs.readFileSync(path.resolve(req.file.path)),
    };

    request(
        requestOptions,
        (err, { statusCode }, body) => {
            body = JSON.parse(body);
            if (statusCode !== 201) {
                res.render('create', { error: 'Failed. Try Again!' })
            } else {
                fs.unlink(path.resolve(req.file.path), (err) => { });
                cb(req, res, body.id);
            }
        })
}

function requestBookCreation(req, res, imageId) {
    let api_path = `/api/books`;
    const { title, author, publisher, price } = req.body;

    let requestOptions = {
        url: `${apiOptions.server}${api_path}`,
        method: 'POST',
        json: {
            title, author, publisher, price,
            image: imageId
        },
        qs: {},
    };

    request(
        requestOptions,
        (err, { statusCode }, body) => {
            if (statusCode !== 201) {
                res.render('create', { error: 'Failed. Try Again!' })
            } else {
                res.redirect(`/list`);
            }
        })
}


const createBook = (req, res) => {

    if (req.file) {
        requestFileCreation(req, res, (req, res, imageId) => {
            requestBookCreation(req, res, imageId);
        });
    } else {
        requestBookCreation(req, res, null);
    }
}


const about = (req, res) => {
    res.render('about', { title: 'About us' });
}

const bookCreateForm = (req, res) => {
    res.render('create');
}

module.exports = {
    booklist,
    about,
    bookDetails,
    createBook,
    bookCreateForm
};
