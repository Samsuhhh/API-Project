"use strict";

const demoImages = [
  // main 1 Tree House
  {
    spotId: 1,
    url: "https://i.imgur.com/UYc8SlU.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'

  },
  {
    spotId: 1,
    url: "https://i.imgur.com/ck8QJWr.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 1,
    url: "https://i.imgur.com/YfDe9ti.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 1,
    url: "https://i.imgur.com/TAdzNxV.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 1,
    url: "https://i.imgur.com/rJvcTrb.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 2 Winter Cabin
  {
    spotId: 2,
    url: "https://i.imgur.com/f1l38Hv.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 2,
    url: "https://i.imgur.com/7gtmkAX.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 2,
    url: "https://i.imgur.com/Z4gbBuz.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 2,
    url: "https://i.imgur.com/NKwec6U.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 2,
    url: "https://i.imgur.com/HAeHPOz.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 3 HollyWood

  {
    spotId: 3,
    url: "https://i.imgur.com/ICATVhX.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 3,
    url: "https://i.imgur.com/E669Bzb.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 3,
    url: "https://i.imgur.com/0Bawt6b.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 3,
    url: "https://i.imgur.com/COfoKdF.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 3,
    url: "https://i.imgur.com/wPox58e.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 4 Bali
  {
    spotId: 4,
    url: "https://i.imgur.com/nSLovuk.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 4,
    url: "https://i.imgur.com/1I5GzJ4.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 4,
    url: "https://i.imgur.com/bXgru1k.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 4,
    url: "https://i.imgur.com/YAbyngQ.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 4,
    url: "https://i.imgur.com/4rcoB4x.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 5 South Korea Jeju
  {
    spotId: 5,
    url: "https://i.imgur.com/neKbBUv.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 5,
    url: "https://i.imgur.com/S6k0VN1.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 5,
    url: "https://i.imgur.com/Xjazw3p.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 5,
    url: "https://i.imgur.com/tUmUw0i.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 5,
    url: "https://i.imgur.com/L2zFrYX.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 6 Las Vegas
  {
    spotId: 6,
    url: "https://i.imgur.com/O746JdR.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 6,
    url: "https://i.imgur.com/d8mF6Ex.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 6,
    url: "https://i.imgur.com/ESUQVNL.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 6,
    url: "https://i.imgur.com/I9mVqCY.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 6,
    url: "https://i.imgur.com/cHHAbxH.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 7 Oahu Hawaii
  {
    spotId: 7,
    url: "https://i.imgur.com/T85UGZo.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 7,
    url: "https://i.imgur.com/z8GQHWE.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 7,
    url: "https://i.imgur.com/z1UYRL7.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 7,
    url: "https://i.imgur.com/mVxylWj.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 7,
    url: "https://i.imgur.com/OWZRnie.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 8 San Fransisco
  {
    spotId: 8,
    url: "https://i.imgur.com/Mb9QPPr.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 8,
    url: "https://i.imgur.com/N8MjIKm.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 8,
    url: "https://i.imgur.com/1tdlKuE.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 8,
    url: "https://i.imgur.com/McAkI9V.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 8,
    url: "https://i.imgur.com/C3ub5z0.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 9 HOME SWEET HOME
  {
    spotId: 9,
    url: "https://i.imgur.com/iQe5Xua.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 9,
    url: "https://i.imgur.com/TfBt5Ik.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 9,
    url: "https://i.imgur.com/1Q6MRHm.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 9,
    url: "https://i.imgur.com/sQtf4ld.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 9,
    url: "https://i.imgur.com/UMKXFz5.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 10 Zion
  {
    spotId: 10,
    url: "https://i.imgur.com/RVLwJa1.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 10,
    url: "https://i.imgur.com/VpzQkBA.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 10,
    url: "https://i.imgur.com/ZJcXd45.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 10,
    url: "https://i.imgur.com/ZVLuqoA.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 10,
    url: "https://i.imgur.com/Rh2gOv4.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  // main 11 Pooh"s House
  {
    spotId: 11,
    url: "https://i.imgur.com/KWOlXyG.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 11,
    url: "https://i.imgur.com/Xdb8PT3.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 11,
    url: "https://i.imgur.com/whHnJqs.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 11,
    url: "https://i.imgur.com/zf1Fqb9.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 11,
    url: "https://i.imgur.com/bsOqIfl.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  // main 12 MIAMI
  {
    spotId: 12,
    url: "https://i.imgur.com/pVe2XN5.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 12,
    url: "https://i.imgur.com/CcP2qCD.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 12,
    url: "https://i.imgur.com/t29Vr1n.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 12,
    url: "https://i.imgur.com/0vSRSjX.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 12,
    url: "https://i.imgur.com/1PDx8lv.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  // main 13 New York

  {
    spotId: 13,
    url: "https://i.imgur.com/05ykR3X.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 13,
    url: "https://i.imgur.com/HStYGMS.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 13,
    url: "https://i.imgur.com/QiVUKLt.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 13,
    url: "https://i.imgur.com/kSOY3Gr.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 13,
    url: "https://i.imgur.com/Bk6wjdh.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 14 Hogwarts
  {
    spotId: 14,
    url: "https://i.imgur.com/QeaWu68.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 14,
    url: "https://i.imgur.com/GpBqSlp.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 14,
    url: "https://i.imgur.com/v9tL5WI.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 14,
    url: "https://i.imgur.com/ZGvFzrx.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  {
    spotId: 14,
    url: "https://i.imgur.com/Y0Uh12c.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },

  // main 15 Valhalla 
  {
    spotId: 15,
    url: "https://i.imgur.com/FgXIRbX.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 15,
    url: false,
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 15,
    url: "https://i.imgur.com/EaMV3Lg.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 15,
    url: "https://i.imgur.com/ESkTCB6.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  },
  {
    spotId: 15,
    url: "https://i.imgur.com/i311CsZ.jpg",
    preview: true,
    createdAt: 'now',
    updatedAt: 'now'
  }

]



module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert("People", [{
     *   name: "John Doe",
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert("SpotImages", demoImages)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete("People", null, {});
     */
    return await queryInterface.bulkDelete("SpotImages")
  }
};
