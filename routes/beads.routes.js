router = require('express').Router();
controller = require('../controller/beads.controller');

router.get('/', controller.getAllAvailableBeads)
router.get('/temp', controller.getTempSolutionByImageURL);
router.get('/:solution_id', controller.getBeadsBySolutionID);

router.post('/:solution_id', controller.postBeadsBySolutionID)

module.exports = router;