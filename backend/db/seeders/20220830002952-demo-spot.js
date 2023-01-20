'use strict';

const demoSpots = [
  {
    ownerId: 1,
    address: "7000 Joe Morgan Wy",
    city: "Oakland",
    state: "California",
    country: "United States",
    lat: 37.75,
    lng: -122.20,
    name: "BIG Tree house",
    description: "300 sq ft treehouse with 3 bedrooms. Close to 7 different hiking trails with a gorgeous open wall bed/bath to breathe in the fresh air.",
    price: 100.00
  },
  {
    ownerId: 1,
    address: "495 Bonanza Dr",
    city: "Tahoe City",
    state: "California",
    country: "United States",
    lat: 39.16,
    lng: -120.15,
    name: "Cabin Getaway",
    description: "Our custom built guesthouse was completed in 2016. Clean and cozy, this space is perfect for your Tahoe getaway. Recently remodeled with brand new furnishings, kitchen, and bathroom, you will have everything you need for a long or short-term stay!",
    price: 530.00
  },
  {
    ownerId: 1,
    address: "45 Brightwood Circle",
    city: "Danville",
    state: "California",
    country: "United States",
    lat: 37.82,
    lng: -121.94,
    name: "City of Stars Entire mansion",
    description: "Our location is a great destination for sight-seeing and experiencing boujee Hollywood. With a gorgeous view over all of Los Angeles, our location can fit up to 20 guests.",
    price: 3230.00
  },
  {
    ownerId: 2,
    address: "Jalan Danau Tamblingan 89",
    city: "Bali",
    state: "Sanur",
    country: "Indonesia",
    lat: -8.26,
    lng: 115.09,
    name: "Kawasan Pariwisata Nusa Dua",
    description:
      "Escape in Bali is a distinguished unique eco stay hidden in the jungle of Tampaksiring a village with spiritual ambiance & ancient Balinese mythology. A perfect hideaway for all adventurous travelers, nature lovers, spiritual-minded people, backpackers, artists, long-time travelers & eco-enthusiast to have their like-no-others Bali experience. It is truly live up the concept of back-to-nature.",
    price: 490.00
  },
  {
    ownerId: 2,
    address: "23-2 Youido-Dong",
    city: "Seoul",
    state: "Gyeonggi",
    country: "South Korea",
    lat: 37.12,
    lng: 121.12,
    name: "Entire traditional home",
    description: "Experience the traditions of Korea with a stay at our beautiful countryside location. Close enough to experience the city life, but far enough to be at peace.",
    price: 990.00
  },
  {
    ownerId: 2,
    address: "662 Las Vegas Blvd S",
    city: "Las Vegas",
    state: "Nevada",
    country: 'United States',
    lat: 36.16,
    lng: -115.15,
    name: "Viva Vegas penthouse",
    description: "This probably won't be the best vacation spot, but if you're looking for a fun time in Sin City, this is the spot for you and yours.",
    price: 770.00
  },

  {
    ownerId: 3,
    address: "511 Ekekela Pl.",
    city: "Kahuku",
    state: "Hawaii",
    country: "United States",
    lat: 21.33,
    lng: -157.85,
    name: "Island Stay",
    description: "The Island Stay beachhouse is a one-of-a-kind beatiful location with direct access to the North Shore of Oahu. With endless activities in the city and tons more in nature, come experience the beauty of Hawaii.",
    price: 800.00
  },

  {
    ownerId: 3,
    address: "1501 Fillmore St.",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 37.78,
    lng: -122.43,
    name: "Entire apartment",
    description: "Our location is a great destination for sight-seeing and experiencing, The City. There is no judgement here, just enjoy our city and leave with good vibes.",
    price: 420.00
  },
  {
    ownerId: 3,
    address: "6551 Del Playa Drive",
    city: "Isla Vista",
    state: "California",
    country: "United States",
    lat: 34.40,
    lng: -119.86,
    name: "Home Sweet Home",
    description: "Tau Palace is a magical place for which words cannot even begin to describe. It's an experience you have to FEEL.. There is also a fun beach and amazing sunsets. Come make memories you will never forget.",
    price: 6510.00
  },
  {
    ownerId: 4,
    address: "1 Zion Park Blvd",
    city: "Springdale",
    state: "Utah",
    country: "United States",
    lat: 37.20,
    lng: -112.98,
    name: "Nature's Getaway",
    description: "Stay at our beautiful location in Zion National Park. It is a unique experience that you will never forget. No smoking. No pets. No Wifi. Bring your own toiletries.",
    price: 888.00
  },


  {
    ownerId: 5,
    address: "100 Aker Wood West",
    city: "London",
    state: "England",
    country: "United Kingdom",
    lat: 51.61,
    lng: 0.135,
    name: "Pooh's House",
    description: "Come experience what it feels like to live like Winnie-the-Pooh. A great and extremely spacious location for animals of all shapes and sizes. Food and Honey included.",
    price: 100.00
  },

  {
    ownerId: 1,
    address: "1230 Ocean Drive ",
    city: "Miami Beach",
    state: "Florida",
    country: "United States",
    lat: 25.78,
    lng: -80.13,
    name: "Miami Vice",
    description: "Our location offers a place for people to let go and just dance the night away. It is a vacation from all the stress and weight life puts on us, so just come to have some fun, dance, and laugh.",
    price: 300.00
  },
  {
    ownerId: 2,
    address: "12 Fifth Avenue ",
    city: "Manhattan",
    state: "New York",
    country: "United States",
    lat: 40.73,
    lng: -73.99,
    name: "New York New York",
    description: "The pictures speak for themselves, but do not do the location justice. Although cold, the best time to visit is in the winter so you can see the snow blanket our wonderful city.",
    price: 910.00
  },
  {
    ownerId: 3,
    address: "4 Dufftown Pl",
    city: "Perth",
    state: "Inveralmond",
    country: "United Kingdom",
    lat: 56.42,
    lng: -3.47,
    name: "!Azkaban",
    description: "You know what it is. You know you want to come. Book your stay ASAP as reservations are almost booked for the next year! Experience the magic. ",
    price: 910.00
  },

  {
    ownerId: 4,
    address: "Reineveien 46",
    city: "8390 Reine",
    state: "Reine",
    country: "Norway",
    lat: 37.56,
    lng: 121.23,
    name: "The Halls",
    description: "One cannot simply purchase their way into our location. You must be vetted and cleared to enter the sacred halls of Valhalla. Only the worthy shall enter.",
    price: 9999999.00
  }
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
    // return Spot.bulkCreate(demoSpots, { validate: true })
    await queryInterface.bulkInsert('Spots', demoSpots)
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
