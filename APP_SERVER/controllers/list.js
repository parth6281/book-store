var express = require('express');
var router = express.Router();

const books = [
    { title: '12 Rules For Life', author: 'Jordan Peterson', src: "/images/12.jpg" },
    { title: 'Beyond Order', author: 'Jordan Peterson', src: "/images/beyond_order.jpg" },
    { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', src: "/images/crime_and_punishment.jpg" },
    { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', src: "/images/beyond_good_evil.jpg" },
    { title: 'The Interpretation of Dreams', author: 'Sigmund Freud', src: "/images/dreams.jpg" },
];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('list-display', { title: 'Books', books });
});

module.exports = router;
