'use strict';

const demoSpots = [
  {
    ownerId: 1,
    address: "123 demo avenue",
    city: "Demo",
    state: "Demofornia",
    country: 'United States of Demo',
    lat: 37.1234,
    lng: 121.1212,
    name: "Demo1",
    description: 'Place for devs to check if they are learning',
    price: 1234
  },

  {
    ownerId: 2,
    address: '456 demo avenue',
    city: 'Demo',
    state: 'Demofornia',
    country: 'United States of Demo',
    lat: 37.5678,
    lng: 121.2323,
    name: "Demo2",
    description: 'Place for devs to check if they are happy',
    price: 1234
  },

  {
    ownerId: 3,
    address: '789 demo avenue',
    city: 'Demo',
    state: 'Demofornia',
    country: 'United States of Demo',
    lat: 37.9101,
    lng: 121.4545,
    name: "Demo3",
    description: 'Place for devs to check if they are sad',
    price: 1234
  },

  {
    ownerId: 2,
    address: '123 please work ave',
    city: 'Beg',
    state: 'All Fours',
    country: 'United States of Demo',
    lat: 37.5678,
    lng: 121.2323,
    name: "PlzPlz",
    description: 'Place for devs to beg',
    price: 1234
  },

  {
    ownerId: 3,
    address: '000 Ghost Town',
    city: 'Dead',
    state: 'South Deadkota',
    country: 'United States of Dead',
    lat: 37.5678,
    lng: 121.2323,
    name: "GhostTown",
    description: 'Place for devs to die',
    price: 666
  },
]
const { Spot } = require('../models')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return Spot.bulkCreate(demoSpots, { validate: true })
  },

  async down(queryInterface, Sequelize) {
    for (let spotInfo of validSpots) {
      await Spot.destroy({
        where: spotInfo
      });
    }
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
