const mongoose = require('mongoose');
const { map } = require('./app');
require('./APP_API/models/book');

const dbURI = 'mongodb+srv://parthkumar6281:mongodb@cluster0.sbtr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: 'BookStore'
    });



mongoose.connection.on('connected', () => {
    // let review = {
    //     author: 'Parth',
    //     rating: 4,
    //     reviewText: 'The first to discover levels of consciousness below our awareness - the preconscious and the unconscious (he did not use the term subconscious'
    // };

    // const Book = mongoose.model('Book');

    // Book.find({}, (err, docs) => {
    //     docs.forEach(book => {
    //         let rating = 0;
    //         book.reviews.forEach(review => {
    //             rating += review.rating
    //         })

    //         book.rating = (rating / book.reviews.length).toFixed(0);
    //         book.save();
    //     })
    // })
    images();
});


function images() {
    const Book = mongoose.model('Book');
    const Image = mongoose.model('Image');
    const mime = require('mime-types');
    const path = require('path');

    const fs = require('fs');

    let mappings = [
        { img: '12.jpg', book: '12 Rules For Life' },
        { img: 'beyond_order.jpg', book: 'Beyond Order' },
        { img: 'crime_and_punishment.jpg', book: 'Crime and Punishment' },
        { img: 'beyond_good_evil.jpg', book: 'Beyond Good and Evil' },
        { img: 'dreams.jpg', book: 'The Interpretation of Dreams' }
    ];


    fs.readdir('./public/images', (err, files) => {
        files.forEach(file => {

            Image.create({
                image: fs.readFileSync(`./public/images/${file}`),
                mime: mime.lookup(file)
            }, (err, image) => {
                if (err) return console.error(err.stack);
                console.log(image);

                mappings.forEach(map => {
                    if (map.img == file) {
                        Book.find({ title: map.book }, (err, docs) => {
                            let doc = docs[0];

                            doc.image = image._id;
                            doc.save();
                        })
                    }
                })

            })
        })
    });

}