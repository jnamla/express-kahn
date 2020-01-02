require('dotenv').config();
const path = require('path');

const loggers = require('../utils/logger');

module.exports = {
  development: {
    sitename: 'Roux Meetups [Development]',
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      avatars: path.join(__dirname, '../data/avatars'),
    },
    database: {
      dsn: process.env.DEV_DB_DSN,
      initOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    },
    auth: {
      secret: process.env.DEV_SECRET
    },
    log: loggers.development
  },
  production: {
    sitename: 'Roux Meetups',
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback.json'),
      avatars: path.join(__dirname, '../data/avatars'),
    },
    database: {
      dsn: process.env.PROD_DB_DSN,
      initOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    },
    auth: {
      secret: process.env.PROD_SECRET
    },
    log: loggers.production
  },
  test: {
    sitename: 'Roux Meetups [Test]',
    data: {
      speakers: path.join(__dirname, '../data/speakers.json'),
      feedback: path.join(__dirname, '../data/feedback-test.json'),
      avatars: path.join(__dirname, '../data/avatars/test'),
    },
    database: {
      dsn: process.env.TEST_DB_DSN,
      initOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    },
    auth: {
      secret: process.env.TEST_SECRET
    },
    log: loggers.test
  },
};
