'use strict';

const demoImages = [

  //death valley
  {
    spotId: 1,
    url:'https://www.meganstarr.com/wp-content/uploads/2020/11/Mountains-lit-by-a-sunrise-in-Death-Valley-National-Park.jpg',
    preview: true,
  },

  //mt everest
  {
    spotId: 2,
    url:'https://www.google.com/maps/about/images/treks/everest8-carousel.jpg',
    preview: true,
  },
  //amazon jungle
  {
    spotId: 3,
    url: 'https://www.globotreks.com/wp-content/uploads/2020/03/Amazon-Jungle-Palm-Shelter.jpg',
    preview: true,
  },
  //google lol
  {
    spotId: 4,
    url: 'http://cdn.cnn.com/cnnnext/dam/assets/210918100336-restricted-01-winnie-the-pooh-airbnb.jpg',
    preview: true,
  },
  //appAcademy
  {
    spotId: 5,
    url: 'https://computersciencehero.com/wp-content/uploads/2019/10/51573033_2076486832438827_2048960555678433280_n.jpg',
    preview: true,
  },

]



module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   return await queryInterface.bulkInsert('SpotImages', demoImages )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("SpotImages")
  }
};
