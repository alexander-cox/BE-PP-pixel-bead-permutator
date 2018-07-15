const router = require('express').Router();
const favourites = require('./favourites.route');
const inventory = require('./inventory.routes');
const solutions = require('./solutions.routes');
const users = require('./users.routes');

router.use('/favourites', favourites);
router.use('/inventory', inventory);
router.use('/solutions', solutions);
router.use('/users', users);

module.exports = router;