const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    reviewText: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        'default': 0
    },
    image: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Image'
    },
    reviews: [reviewSchema]
});

const imageSchema = new mongoose.Schema({
    image: Buffer,
    mime: String
});

mongoose.model('Image', imageSchema);
mongoose.model('Book', bookSchema);
