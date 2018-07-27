const router = require('express').Router();
const controller = require('../controller/users.controller');

router.get('/', controller.getAllUsers);
router.get('/:username', controller.getUserByUsername);
router.get('/id/:user_id', controller.getUserByUserId);
router.get('/:user_id/favourites', controller.getFavouritesByUserID);
router.post('/', controller.postNewUser);

module.exports = router;