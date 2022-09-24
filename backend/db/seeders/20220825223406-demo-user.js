'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Alex',
        lastName: 'DAMN',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password12')
      },
      {
        firstName: 'Jake',
        lastName: 'startWithAnM',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Gary',
        lastName: 'myBoo',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demouser@demo.com',
        username: 'demodemo',
        hashedPassword: bcrypt.hashSync('password!')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'demodemo'] }
    }, {});
  }
};