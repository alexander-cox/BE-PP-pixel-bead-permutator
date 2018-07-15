const router = require('express').Router();
const controller = require('../controller/users.controller');

router.get('/', (req, res) => {
    return controller.getAllUsers(req, res);
});

router.get('/:username', (req, res) => {
    return controller.getUserByUsername(req, res);
});

router.get('/:username/favourites', (req, res) => {
    return controller.getFavouritesByUsername(req, res);
});

router.post('/', (req, res) => {
    return controller.postNewUser(req, res);
});

module.exports = router;