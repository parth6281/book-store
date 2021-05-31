var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // render the about page of the site.
    res.render('about', { title: 'About us' });
});

module.exports = router;
