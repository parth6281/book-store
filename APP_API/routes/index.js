const express = require('express');
const router = express.Router();

const ctrlBooks = require('../controllers/books');
const ctrlImages = require('../controllers/images');

router
    .route('/books')
    .get(ctrlBooks.bookslist)
    .post(ctrlBooks.booksCreate);

router
    .route('/books/:bookid')
    .get(ctrlBooks.booksReadOne)
    .put(ctrlBooks.booksUpdateOne)
    .delete(ctrlBooks.booksDeleteOne);


router.get('/images/:imageid', ctrlImages.getImage);

router.post('/images', ctrlImages.createImage);


module.exports = router;