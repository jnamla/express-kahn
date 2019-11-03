const chai = require('chai');
const chaiHttp = require('chai-http');
const helper = require('../helper');

const should = chai.should();
const { config, logger } = helper;
const app = require('../../server/app')(config, logger);

chai.use(chaiHttp);

describe('The Application', () => {
  beforeEach(async () => helper.before());
  afterEach(async () => helper.after());
  it('should have an index route', async () => {
    const res = await chai.request(app).get('/');
    res.should.have.status(200);
  });
  it('should have a speakers route', async () => {
    const res = await chai.request(app).get('/speakers');
    res.should.have.status(200);
  });
  it('should have a feedback route', async () => {
    const res = await chai.request(app).get('/feedback');
    res.should.have.status(200);
  });
  it('should have a registration route', async () => {
    const res = await chai.request(app).get('/users/registration');
    res.should.have.status(200);
  });
});
