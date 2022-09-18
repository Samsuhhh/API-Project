'use strict';

const demoSpots = [
  {
    ownerId: 1,
    address: "123 demo avenue",
    city: "Los Angeles",
    state: "Demofornia",
    country: 'United States of Demo',
    lat: 37.1234,
    lng: 121.1212,
    name: "HollyWood",
    description: 'Place for devs to check if they are acting',
    price: 3000
  },

  {
    ownerId: 2,
    address: '456 demo avenue',
    city: 'San Francsisco',
    state: 'Demofornia',
    country: 'United States of Demo',
    lat: 37.5678,
    lng: 121.2323,
    name: "YayArea",
    description: 'Place for devs to check if they are crying on the inside',
    price: 420
  },

  {
    ownerId: 3,
    address: '789 demo avenue',
    city: 'YOahu',
    state: 'Havvai',
    country: 'United States of Demo',
    lat: 37.9101,
    lng: 121.4545,
    name: "Demo3",
    description: 'Place for devs to check if they need a break',
    price: 500
  },

  {
    ownerId: 2,
    address: '100 Aker Wood West',
    city: 'Big',
    state: 'Tree',
    country: 'Winnie-the-Pooh',
    lat: 37.5678,
    lng: 121.2323,
    name: "Pooh Bear's House",
    description: 'Place for devs to not care',
    price: 8888
  },

  {
    ownerId: 3,
    address: '000 Ghost Town',
    city: 'Dead',
    state: 'South',
    country: 'United States of Dead',
    lat: 37.5678,
    lng: 121.2323,
    name: "Ghost Town",
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
