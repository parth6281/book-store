var express = require('express');
var router = express.Router();

const ctrlBooks = require('../controllers/books');
var multer = require('multer');
var upload = multer({ dest: 'public/images/', preservePath: true })

var ctrlImages = require('../controllers/images');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index.pug', { title: 'Book Store' });
});

router.get('/create', ctrlBooks.bookCreateForm);

router.get('/about', ctrlBooks.about);

router.get('/list', ctrlBooks.booklist);

router.get('/details/:bookid', ctrlBooks.bookDetails);

router.post('/uploadbook', upload.single('image'), ctrlBooks.createBook);

router.get('/display', function (req, res, next) {
    res.render('display', { title: 'Display' });
})

router.get('/images/:imageid', ctrlImages.getImage);

module.exports = router;
