const path = require('path');
const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};


const getImage = (req, res) => {

    const api_path = '/api/images/';
    const requestOptions = {
        url: `${apiOptions.server}${api_path}${req.params.imageid}`,
        method: 'GET',
        json: {},
        qs: {},
        encoding: null
    };


    request(requestOptions,
        (err, response, body) => {
            if (err || response.statusCode == 400) {
                return res.status(404).json({ message: 'Not Found' });
            }
            if (response.statusCode == 404) {
                let file = path.resolve('public/images/placeholder.jpg');
                res.sendFile(file);
            } else {
                res.contentType(response.headers['content-type']);
                res.end(body);
            }
        })
}

module.exports = {
    getImage
}