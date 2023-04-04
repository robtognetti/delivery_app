const sinon = require('sinon');
const chaiHttp = require('chai-http');
const chai = require('chai');
const { afterEach } = require('mocha');
const { User } = require('../../../database/models');
const app = require('../../../api/app');
const { userGetById, registerAdminService } = require('../../../api/services/UsersService');

const { expect } = chai;
chai.use(chaiHttp);

describe('Deve testar a função usersGetService', function () {
  afterEach(function () {
    sinon.restore();
  });

  const mockUsers = [
    {
        id: 1,
        name: 'Grande Zé Birita',
        email: 'zébirita@email.com',
        role: 'customer',
    },
    {
      id: 1,
      name: 'Fernandinha vendedora',
      email: 'fernadinhavendedora@email.com',
      role: 'seller',
  },
  {
    id: 1,
    name: 'Poderoso ADM',
    email: 'administrator@email.com',
    role: 'customer',
  },
  ];
  
  describe('GET /users', function () {
    before(function () {
      sinon.stub(User, 'findAll').resolves(mockUsers.map((users) => users));
    });
    it('Testa o funcionamento da rota', async function () {
      const response = await chai.request(app).get('/users');
      expect(response.status).to.be.equal(200);
    });
  });
  describe('userGetById', function () {
      it('Deve encontrar um usuário por ID', async function () {
        const id = 1;
        const user = { id, name: 'Zé Birita' };
        const findOneStub = sinon.stub(User, 'findOne').resolves(user);
        const result = await userGetById(id);
        const requestId = findOneStub.calledOnceWith({ where: { id } });
        expect(requestId).to.equal(true);
        expect(result).to.equal(user);
        findOneStub.restore();
      });
  });

  describe('registerAdminService', function () {
    beforeEach(function () {
      sinon.stub(User, 'findOne');
      sinon.stub(User, 'create');
    });
  
    afterEach(function () {
      sinon.restore();
    });
  
    it('Deve retornar falso se o usuário existir', async function () {
      const user = {
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
        role: 'admin',
      };
  
      User.findOne.resolves(user);
  
      const result = await registerAdminService(user);
  
      chai.expect(result).to.equal(false);
    });
  
    it('Deve criar o usuário e retornar o resultado', async function () {
      const user = {
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
        role: 'admin',
      };
  
      User.findOne.resolves(null);
      User.create.resolves(user);
  
      const result = await registerAdminService(user);
  
      chai.expect(result).to.deep.equal(user);
    });
  });
});
