'use strict';

const demoSpots = [
  {
    ownerId: 1,
    address: '119 Big Tree Avenue',
    city: 'Redwood',
    state: 'California',
    country: 'United States',
    lat: 37.5678,
    lng: 121.2323,
    name: "BIG Tree house",
    description: '300 sq ft treehouse with 3 bedrooms. Close to 7 different hiking trails with a gorgeous open wall bed/bath to breathe in the fresh air.',
    price: 100
  },
  {
    ownerId: 1,
    address: '87 Snowhill Drive',
    city: 'Lake Tahoe',
    state: 'California',
    country: 'United States',
    lat: 37.5678,
    lng: 121.2323,
    name: "Cabin Getaway",
    description: 'Our custom built guesthouse was completed in 2016. Clean and cozy, this space is perfect for your Tahoe getaway. Recently remodeled with brand new furnishings, kitchen, and bathroom, you will have everything you need for a long or short-term stay!',
    price: 530
  },

  {
    ownerId: 1,
    address: "10748 Brightwood Ln.",
    city: "Los Angeles",
    state: "California",
    country: 'United States',
    lat: 37.1234,
    lng: 121.1212,
    name: " 'City of Stars' Entire mansion",
    description: 'Our location is a great destination for sight-seeing and experiencing boujee Hollywood. With a gorgeous view over all of Los Angeles, our location can fit up to 20 guests.',
    price: 3230
  },
  {
    ownerId: 2,
    address: "Kawasan Wisata Nusa Dua",
    city: "Bali",
    state: "Lesser Sunda Islands",
    country: 'United States',
    lat: 37.1234,
    lng: 121.1212,
    name: "Entire villa",
    description: 'Also known as the Land of the Gods, our location appeals through its sheer natural beauty of looming volcanoes and lush terraced rice fields that exude peace and serenity. ',
    price: 497
  },
  {
    ownerId: 2,
    address: "23-2 Youido-Dong",
    city: "Seoul",
    state: "Gyeonggi",
    country: 'South Korea',
    lat: 37.1234,
    lng: 121.1212,
    name: "Entire traditional home",
    description: 'Experience the traditions of Korea with a stay at our beautiful countryside location. Close enough to experience the city life, but far enough to be at peace.',
    price: 999
  },
  {
    ownerId: 2,
    address: '662 Las Vegas Blvd',
    city: 'Las Vegas',
    state: 'Nevada',
    country: 'United States',
    lat: 37.5678,
    lng: 121.2323,
    name: "Viva Vegas penthouse",
    description: "This probably won't be the best vacation spot, but if you're looking for a fun time in Sin City, this is the spot for you and yours.",
    price: 777
  },

  {
    ownerId: 3,
    address: "511 Ekekela Pl.",
    city: "Kahuku",
    state: "Hawaii",
    country: 'United States',
    lat: 37.1234,
    lng: 121.1212,
    name: "Island Stay",
    description: 'The Island Stay beachhouse is a one-of-a-kind beatiful location with direct access to the North Shore of Oahu. With endless activities in the city and tons more in nature, come experience the beauty of Hawaii.',
    price: 808
  },

  {
    ownerId: 3,
    address: "1501 Fillmore St.",
    city: "San Francisco",
    state: "California",
    country: 'United States',
    lat: 37.1234,
    lng: 121.1212,
    name: "Entire apartment",
    description: 'Our location is a great destination for sight-seeing and experiencing "The City". There is no judgement here, just enjoy our city and leave with good vibes.',
    price: 420
  },
  {
    ownerId: 3,
    address: '6551 Del Playa Drive',
    city: 'Isla Vista',
    state: 'California',
    country: 'United States',
    lat: 37.5678,
    lng: 121.2323,
    name: "Home Sweet Home",
    description: "Tau Palace is a magical place for which words cannot even begin to describe. It's an experience you have to FEEL.. There is also a fun beach and amazing sunsets. Come make memories you will never forget.",
    price: 6511
  },
  {
    ownerId: 4,
    address: '14 Mt. Zion',
    city: 'Utah',
    state: 'California',
    country: 'United States',
    lat: 37.5678,
    lng: 121.2323,
    name: "Nature's Getaway",
    description: "Stay at our beautiful location in Zion National Park. It is a unique experience that you will never forget. No smoking. No pets. No Wifi. Bring your own toiletries.",
    price: 6511
  },


  {
    ownerId: 5,
    address: '100 Aker Wood West',
    city: 'Hundred',
    state: 'Acre',
    country: 'Wood',
    lat: 37.5678,
    lng: 121.2323,
    name: "Pooh's House",
    description: 'Come experience what it feels like to live like Winnie-the-Pooh. A great and extremely spacious location for animals of all shapes and sizes. Food and Honey included.',
    price: 100
  },

  {
    ownerId: 1,
    address: '1230 Ocean Drive ',
    city: 'Miami Beach',
    state: 'Florida',
    country: 'United States',
    lat: 37.5678,
    lng: 121.2323,
    name: "Miami Vice",
    description: 'Our location offers a place for people to let go and just dance the night away. It is a vacation from all the stress and weight life puts on us, so just come to have some fun, dance, and laugh.',
    price: 305
  },
  {
    ownerId: 2,
    address: '12 Fifth Avenue ',
    city: 'Manhattan',
    state: 'New York',
    country: 'United States',
    lat: 37.5678,
    lng: 121.2323,
    name: "New York New York",
    description: 'The pictures speak for themselves, but do not do the location justice. Although cold, the best time to visit is in the winter so you can see the snow blanket our wonderful city.',
    price: 917
  },
  {
    ownerId: 3,
    address: '934',
    city: 'Dufftown',
    state: 'Potter',
    country: 'Scotland',
    lat: 37.5678,
    lng: 121.2323,
    name: "!Azkaban",
    description: 'You know what it is. You know you want to come. Book your stay ASAP as reservations are almost booked for the next year! Experience the magic. ',
    price: 917
  },

  {
    ownerId: 4,
    address: '111 Sky Avenue',
    city: 'Hallow',
    state: 'Valhalla',
    country: 'United States',
    lat: 37.5678,
    lng: 121.2323,
    name: "The Halls",
    description: 'One cannot simply purchase their way into our location. You must be vetted and cleared to enter the sacred halls of Valhalla. Only the worthy shall enter.',
    price: 99999999
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
