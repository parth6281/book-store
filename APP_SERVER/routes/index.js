var express = require('express');
var router = express.Router();

// Require controllers to be assigned as appropriate routes.
const listRouter = require('../controllers/list');
const aboutRouter = require('../controllers/about');

/* GET home page. */
router.get('/', function (req, res, next) {
    // render index page of the application.
    res.render('index', { title: 'Book Store' });
});

// assign imported routers to the appropriate routes.
router.use('/about', aboutRouter);
router.use('/list', listRouter);


router.get('/display', function (req, res, next) {
    // render display page of the application.
    res.render('display', { title: 'Display' });
})

module.exports = router;
