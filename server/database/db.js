const mongoose = require('mongoose');

const initializationOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports.connect = async dsn => mongoose.connect( dsn, initializationOptions );