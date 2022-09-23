'use strict';

const demoImages = [

  //death valley
  {
    imgUrl:'https://www.meganstarr.com/wp-content/uploads/2020/11/Mountains-lit-by-a-sunrise-in-Death-Valley-National-Park.jpg',
    preview: true
  },

  {
    imgUrl:'https://www.google.com/maps/about/images/treks/everest8-carousel.jpg',
    preview: true
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
   return await queryInterface.bulkInsert('SpotImages', )
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
