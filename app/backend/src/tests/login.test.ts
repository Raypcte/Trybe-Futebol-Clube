import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { describe, it, beforeEach, afterEach } from 'mocha';

import { app } from '../app';
import User from '../database/models/User';
import { createToken } from '../auth'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando login', () => {

  let chaiHttpResponse: Response;
  const userMock = {
    id: 1,
    username: 'fulano',
    role: 'user',
    email: 'fulano@gmail.com',
    password: 'xablau',
  }

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('acessando rota /login', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login');
    
    const token = createToken(userMock);
    
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.deep.equal({
      token,
    })
  });
});
