const express = require('express');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();



//GET ALL REVIEWS OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id

    const reviews = await Review.findAll({
        include:[{model: User, as: 'User'}, {model: ReviewImage, as: "ReviewImages"}, {model: Spot, as: "Spot"}],
        where: {
            userId: userId
        }, 
    });

    res.json({ Reviews: reviews})
});






// create an image for a review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const {reviewId} = req.params;
    const {url} = req.body;
    const findReview = await Review.findByPk(reviewId);

    if (!findReview) {
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    };

    const hasImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    });

    if (hasImages.length >= 10) {
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        })
    };

    const addImage = await ReviewImage.create({
        url,
        reviewId: reviewId
    })
    res.json(addImage);


});



module.exports = router;