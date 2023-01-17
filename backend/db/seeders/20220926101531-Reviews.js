'use strict';

const demoReviews = [
  {
    userId: 1,
    spotId: 6,
    review: "Wow you guys weren't kidding, this place was 'fun' to say the least. I don't remember half of it, but it was awesome.",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 1,
    spotId: 8,
    review: "The City was an amazing place. It was so cute and I just wanted to stay here forever. I loved the vibes and how accepting everyone was.",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 1,
    spotId: 4,
    review: "What an experience. It felt like I was in another world entirely. It was so relaxing and I just felt so at peace. 10/10",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 1,
    spotId: 5,
    review: "I got to travel across the globe to a foreign land and experience the traditional Korean culture. It felt so awesome to be here and experience this.",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 1,
    spotId: 10,
    review: "Zion was a breathtaking trip. The place was so secluded and being in nature was so beautiful. The location was prepped to perfection and after a long day of hiking and nature-ing, it was a great place to relax and rest up.",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 2,
    spotId: 2,
    review: "I am originally from California, so seeing the snow is foreign to me, yet alone living in it. However, the place was beautiful and I have a greater appreciation for the other seasons I didn't know existed. Great Cabin!",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 2,
    spotId: 3,
    review: "The weather was nice, but I was not a fan of Los Angeles. I heard so many stories of it being so great and HOLLYWOOD! but I was dissapointed by the city. Location was 10/10 but the city was underwhelming.",
    stars: 3,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 2,
    spotId: 7,
    review: "The SUN and the BEACHES were all we wanted, but we got so so so much more! Such a great location, literally on the beach with lots of surfboards and canoes to take out free of charge. Awesome location 11/10!!",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 3,
    spotId: 2,
    review: "Wow. This place looked like it was ripped straight out of a fairytale. The snow was mesmerizing and made me feel all warm and cuddly inside. The fireplace was a huge bonus. 10/10 recommend.",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 3,
    spotId: 3,
    review: "Wow the pictures do not do this location justice. I have never seen a more beautiful house and it was an honor to stay here for our trip. My friends and I had a blast in the house and an even better time going out into the city at night. AWESOME trip!",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 3,
    spotId: 10,
    review: "What can I say to make you read this review and book this location ASAP. Such a great location for the price and TONS of things to do. Conquer your fears and go on the Angels Landing hike and as many others as you can!",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 3,
    spotId: 4,
    review: "Wow. Bali. An experience like no other. Cannot wait to go back. Owners did a great job preparing the place for us and we felt bad having so much fun! Great place for you and yours to vacay!",
    stars: 5,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 4,
    spotId: 4,
    review: "I booked this place because it had so many great reviews, but I was not impressed. House was NOT clean when we got there and it was not up to my expectations. If you're going to do your job, do it right!!",
    stars: 1,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 4,
    spotId: 1,
    review: "I don't even know why I chose to book this location in the first place. It's a TREE. Who in their right mind would book this place. If I wanted to live in a tree, I would have been a monkey. If you're stupid, go ahead and book this tree.",
    stars: 1,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 4,
    spotId: 7,
    review: "I don't get why there are so many good reviews for this location. It was so loud at night, the waves would NOT stop. The owner did not mention it would be so loud I wouldn't even be able to sleep. I want a refund!!!",
    stars: 1,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 4,
    spotId: 11,
    review: "I only booked this location because it said free food and honey provided, BUT NONE OF IT WAS VEGAN AND GLUTEN FREE. I WANT A REFUND!! Pooh bear wasn't even there. This is craziness.",
    stars: 1,
    createdAt: 'Now',
    updatedAt: 'Now'
  },
  {
    userId: 3,
    spotId: 6,
    review: "I'm never coming back. It wasn't a bad stay at all in terms of the Penthouse, but that was a wild ride. Whatever happened here will hopefully remain here. I cannot in good conscious give this place of Sin 5 stars..",
    stars: 4,
    createdAt: 'Now',
    updatedAt: 'Now'
  }
]




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
    await queryInterface.bulkInsert('Reviews', demoReviews);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews')
  }
};
