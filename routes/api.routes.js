const router = require('express').Router();
const inventory = require('./inventory.routes');
const solutions = require('./solutions.routes');
const users = require('./users.routes');
const beads = require('./beads.routes');

router.use('/inventory', inventory);
router.use('/solutions', solutions);
router.use('/users', users);
router.use('/beads', beads);

module.exports = router;