import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { describe, it, beforeEach, afterEach } from 'mocha';

import { app } from '../app';
import Teams from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando Team', () => {

  let chaiHttpResponse: Response;
  const teamsMock = [
    {
      "id": 1,
      "teamName": "Bahia"
    },
    {
      "id": 2,
      "teamName": "Botafogo"
    },
  ];

  it('acessando rota /teams', async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(teamsMock as any);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams');
    
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock)
  });

  it('acessando rota /teams/:id', async () => {
    sinon
      .stub(Teams, "findByPk")
      .resolves(teamsMock[0] as any);

    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1');
    
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.deep.equal(teamsMock[0])
  });
});
