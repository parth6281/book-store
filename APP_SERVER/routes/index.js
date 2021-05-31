var express = require('express');
var router = express.Router();

const listRouter = require('../controllers/list');
const aboutRouter = require('../controllers/about');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Book Store' });
});

router.use('/about', aboutRouter);

router.use('/list', listRouter);

router.get('/display', function (req, res, next) {
    res.render('display', { title: 'Display' });
})

module.exports = router;
