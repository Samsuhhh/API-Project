const express = require('express');
const { ReviewImage, Review, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();
const sequelize = require('sequelize');



router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const deleteImage = await ReviewImage.findByPk(imageId);

    if (!deleteImage) {
        return res
            .status(404)
            .json({
                message: "Review Image couldn't be found",
                statusCode: res.statusCode
            });
    };

    deleteImage.destroy();
    res.statusCode = 200
    return res.json({
        message: 'Successfully deleted',
        statusCode: res.statusCode
    });

});



module.exports = router;