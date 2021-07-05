const mongoose = require('mongoose');
require('./book');

const dbURI = 'mongodb+srv://parthkumar6281:mongodb@cluster0.sbtr1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const dbURI = 'mongodb://localhost/BookStore'

mongoose.connect(dbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: 'BookStore'
    });

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
})

mongoose.connection.on('error', err => console.log(`Mongoose connection error: ${err}`));

mongoose.connection.on('disconnected', () => console.log(`Mongoose disconnected`));

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    })
};

process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    })
});

process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    })
})

process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    })
})