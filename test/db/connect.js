/* eslint-disable no-unused-expressions */
const chai = require('chai');

const { MongoClient } = require('mongodb');

const should = chai.should();
const { expect } = chai;
const configDev = require('../../server/config').development;
const configProd = require('../../server/config').production;
const configTest = require('../../server/config').test;

describe('The DSN', () => {
  it('should be configured for development', async () => {
    expect(configDev.database.dsn).to.be.a('string');
  });
  it('should be configured for production', async () => {
    expect(configProd.database.dsn).to.be.a('string');
  });
  it('should be configured for testing', async () => {
    expect(configTest.database.dsn).to.be.a('string');
  });
});


describe('The options to connect', () => {
  it('should be configured for development', async () => {
    expect(configDev.database.initOptions).to.have.own.property('useNewUrlParser');
    expect(configDev.database.initOptions).to.have.own.property('useUnifiedTopology');
    expect(configDev.database.initOptions).to.have.own.property('useCreateIndex');
  });
  it('should be configured for production', async () => {
    expect(configProd.database.initOptions).to.have.own.property('useNewUrlParser');
    expect(configProd.database.initOptions).to.have.own.property('useUnifiedTopology');
    expect(configProd.database.initOptions).to.have.own.property('useCreateIndex');
  });
  it('should be configured for testing', async () => {
    expect(configTest.database.initOptions).to.have.own.property('useNewUrlParser');
    expect(configTest.database.initOptions).to.have.own.property('useUnifiedTopology');
    expect(configTest.database.initOptions).to.have.own.property('useCreateIndex');
  });
});

describe('The database', () => {
  it('development should be reachable', async () => {
    const db = await MongoClient.connect(configDev.database.dsn, configDev.database.initOptions);
    expect(db).to.not.be.null;
    await db.close();
  });
  it('test should be reachable', async () => {
    const db = await MongoClient.connect(configTest.database.dsn, configTest.database.initOptions);
    expect(db).to.not.be.null;
    await db.close();
  });
  it('production should be reachable', async () => {
    const db = await MongoClient.connect(configProd.database.dsn, configProd.database.initOptions);
    expect(db).to.not.be.null;
    await db.close();
  });
});
