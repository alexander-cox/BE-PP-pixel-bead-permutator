router = require('express').Router();
controller = require('../controller/beads.controller');

router.get('/', controller.getAllAvailableBeads)

router.post('/:solution_id', controller.postBeadsBySolutionID)

module.exports = router;