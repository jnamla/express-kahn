const mongoose = require('mongoose');

const initializationOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

module.exports.connect = async dsn => mongoose.connect( dsn, initializationOptions );