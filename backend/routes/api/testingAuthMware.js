
// // TESTING USER AUTH MIDDLEWARES (DELETE LATER)
// // router.post('/test', function (req, res) {
// //     res.json({ requestBody: req.body });
// // });

// // // TEST ROUTER (delete me later?)
// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

