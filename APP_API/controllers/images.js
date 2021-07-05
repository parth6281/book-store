const mongoose = require('mongoose');
const path = require('path');
const Image = mongoose.model('Image');

const getImage = (req, res) => {
    const imageId = req.params.imageid;

    if (!imageId) {
        return res.status(400).json({ message: 'Image id required.' })
    }

    Image.findById(imageId).exec((err, image) => {
        if (err || !image) {
            return res.status(404).json({ message: 'Not Found' });
        }

        res.contentType(image.mime);
        res.end(image.image);
    });
}

const createImage = (req, res) => {
    let b = Buffer.alloc(0);
    req.on('data', data => {
        b = Buffer.concat([b, Buffer.from(data)])
    })

    req.on('end', () => {
        Image.create({
            image: b,
            mime: req.headers['content-type']
        }, (err, image) => {
            if (err) {
                return res.status(500).json({ message: 'Something went Wrong.' });
            }
            res.status(201).json({ id: image.id });
        })
    });
};


module.exports = {
    getImage,
    createImage
}