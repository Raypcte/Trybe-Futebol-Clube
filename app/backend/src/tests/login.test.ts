import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { describe, it, afterEach } from 'mocha';

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
    password: bcrypt.hashSync('xablau'),
  }

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  });

  it('acessando rota /login', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'fulano@gmail.com',
        password: 'xablau',
       })
    
    const token = createToken(userMock);
    
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.deep.equal({
      token,
    })
  });

  it('error "All fields must be filled"', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        password: 'xablau',
       })
    
    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body).to.deep.equal({
      "message": "All fields must be filled"
    })
  });

  it('error "Incorrect email or password"', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);

    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: 'email@errado',
        password: 'xablau',
       })
    
    expect(chaiHttpResponse.status).to.be.equal(401)
    expect(chaiHttpResponse.body).to.deep.equal({
      "message": "Incorrect email or password"
    })
  });
});

describe('testando login/validate', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    (User.findByPk as sinon.SinonStub).restore();
  });

  it('acessando rota /login/validate', async () => {
    sinon
      .stub(User, "findByPk")
      .resolves({
        "role": "admin"
      } as User);
  
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTY3NDk1NjkzOSwiZXhwIjoxNjc1NTYxNzM5fQ._Y8aqeIhXL1drXicxbBVLB7DnzQBSffuQsiYTshGA7U')

    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.deep.equal({
      "role": "admin"
    })
  });
});
//teste