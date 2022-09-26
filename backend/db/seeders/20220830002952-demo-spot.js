'use strict';

const demoSpots = [
  {
    ownerId: 1,
    address: '119 Big Tree Ave',
    city: 'Redwood',
    state: 'California',
    country: 'United States of America',
    lat: 37.5678,
    lng: 121.2323,
    name: "Big Tree house",
    description: '300 sq ft treehouse with stairs leading ',
    price: 100
  },
  {
    ownerId: 2,
    address: '87 Snowhill Drive',
    city: 'Lake Tahoe',
    state: 'California',
    country: 'United States of America',
    lat: 37.5678,
    lng: 121.2323,
    name: "Cabin Getaway for party of 2-6",
    description: 'Our custom built guesthouse was completed in 2016. Clean and cozy, this space is perfect for your Tahoe getaway. Recently remodeled with brand new furnishings, kitchen, and bathroom, you will have everything you need for a long or short-term stay!',
    price: 300
  },
  {
    ownerId: 1,
    address: "123 demo avenue",
    city: "Los Angeles",
    state: "Demofornia",
    country: 'United States of Demo',
    lat: 37.1234,
    lng: 121.1212,
    name: "Death Valley",
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
    name: "Mt Everest",
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
    name: "amazon jungle",
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
    description: 'Place for devs to learn',
    price: 31000
  },

  
  {
    ownerId: 3,
    address: '6551 Del Playa Drive',
    city: 'Isla Vista',
    state: 'California',
    country: 'United States of America',
    lat: 37.5678,
    lng: 121.2323,
    name: "Tau Palace",
    description: "Tau Palace is a magical place for which words cannot even begin to describe. It's an experience you have to FEEL.. There is also a fun beach. ",
    price: 6511
  },
  {
    ownerId: 3,
    address: '6547 Del Playa Dr.',
    city: 'Isla Vista',
    state: 'California',
    country: 'United States of America',
    lat: 37.5678,
    lng: 121.2323,
    name: "Four Sevon",
    description: 'Four Sevon is the perfect place to visit if you want to make your home feel like a vacation everyday. The uncleanliness and unwelcoming environment makes you appreciate home that much more. ',
    price: 100
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
