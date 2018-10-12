let mongoose = require('mongoose');
let DB_URL = 'mongodb://127.0.0.1:27017/dumall';

mongoose.connect(DB_URL, { useNewUrlParser: true });

mongoose.connection.on('connected', function () {
    console.log('mongodb connection success ');
});
mongoose.connection.on('error', function () {
    console.log('mongodb connection file ');
});
mongoose.connection.on('disconnected', function () {
    console.log('mongodb connection disconnected ');
});

module.exports = mongoose;