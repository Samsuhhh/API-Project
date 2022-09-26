'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'John',
        lastName: 'Carrera',
        email: 'John@Carrera.com',
        username: 'AyCarrera',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jake',
        lastName: 'Matillano',
        email: 'Jake@Mat.com',
        username: 'JakeyJake123',
        hashedPassword: bcrypt.hashSync('soundcloud')
      },
      {
        firstName: 'Gary',
        lastName: 'myBoo',
        email: 'user2@user.io',
        username: 'GaryAndSam4Ever',
        hashedPassword: bcrypt.hashSync('iloveSam')
      },
      {
        firstName: 'Karen',
        lastName: 'Smith',
        email: 'Karen@Smith.com',
        username: 'MamaKaren',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'David',
        lastName: 'Rogers',
        email: 'ziggy99@demo.com',
        username: '9ziggy9',
        hashedPassword: bcrypt.hashSync('June2022')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['AyCarrera', 'JakeyJake123', 'GaryAndSam4Ever', '9ziggy9'] }
    }, {});
  }
};