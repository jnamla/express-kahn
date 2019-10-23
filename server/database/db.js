const mongoose = require('mongoose');

module.exports.connect = async (dsn, initOptions) => {
    return mongoose.connect( dsn, initOptions );
};