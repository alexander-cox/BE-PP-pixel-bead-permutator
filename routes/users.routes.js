const router = require('express').Router();
const controller = require('../controller/users.controller');

router.get('/', controller.getAllUsers);
router.get('/:username', controller.getUserByUsername);
router.get('/:username/favourites', controller.getFavouritesByUsername);
router.post('/', controller.postNewUser);

module.exports = router;