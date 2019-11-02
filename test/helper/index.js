/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const util = require('util');

let AvatarService = null;
let db = null;
let UserModel = null;

const config = require('../../server/config').test;
const logger = config.log();

logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

try {
  // eslint-disable-next-line import/no-unresolved
  db = require('../../server/database/db');
} catch (err) {
  logger.info('db ignored');
}

try {
  // eslint-disable-next-line import/no-unresolved
  UserModel = require('../../server/database/models/UserModel');
} catch (err) {
  logger.info('UserModel ignored');
}

try {
  // eslint-disable-next-line import/no-unresolved
  AvatarService = require('../../server/services/AvatarService');
} catch (err) {
  logger.info('Avatars ignored');
}

const fsReaddir = util.promisify(fs.readdir);
const fsUnlink = util.promisify(fs.unlink);

async function deleteFilesInDir(directory) {
  const files = await fsReaddir(directory);
  const fileProm = [];
  files.forEach((file) => {
    fileProm.push(fsUnlink(path.join(directory, file)));
  });

  return Promise.all(fileProm);
}

module.exports.UserModel = UserModel;
module.exports.AvatarService = AvatarService;
module.exports.config = config;
module.exports.logger = logger;

module.exports.validUser = {
  username: 'Frank',
  email: 'frank@acme.org',
  password: 'verysecret',
};

module.exports.before = async () => {
  if (db) {
    await db.connect(config.database.dsn, config.database.initOptions);
  }
  if (UserModel) {
    return UserModel.deleteMany({});
  }
  return true;
};

module.exports.after = async () => {
  if (UserModel) {
    await UserModel.deleteMany({});
  }
  return deleteFilesInDir(config.data.avatars);
};

// Local helper function that creates a user
module.exports.createUser = async (agent, user) => agent
  .post('/users/registration')
  .set('content-type', 'application/x-www-form-urlencoded')
  .send(user);

// Local helper function that logs a user in
module.exports.loginUser = async (agent, email, password) => agent
  .post('/users/login')
  .set('content-type', 'application/x-www-form-urlencoded')
  .send({ email, password });
