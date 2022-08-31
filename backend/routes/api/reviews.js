const express = require('express');
const { Spot, SpotImage, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();



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