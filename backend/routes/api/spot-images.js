const express = require('express');
const { SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// Router is live test
// router.get('/', async (req, res) => {
//     res.send('HELLO')
// })

router.delete('/:imageId', requireAuth, async (req, res) => {
    const {imageId} = req.params;
    const deleteImage = await SpotImage.findByPk(imageId);

    if(!deleteImage){
        return res
                .status(404)
                .json({
                    message: "Spot Image couldn't be found",
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