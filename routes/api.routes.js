const router = require('express').Router();
const inventory = require('./inventory.routes');
const solutions = require('./solutions.routes');
const users = require('./users.routes');

router.use('/inventory', inventory);
router.use('/solutions', solutions);
router.use('/users', users);

module.exports = router;