const router = require('express').Router();
const controller = require('../controller/solutions.controller');

//GETs
router.get('/', controller.getAllSolutions);
router.get('/:solution_id', controller.getSolutionByID);
router.get('/user/:user_id', controller.getSolutionsByUserID);

//POSTs
router.post('/user/:user_id', controller.postSolutionByUserID);

//PUTs
router.put('/:solution_id/votes', controller.putVoteUpOrDown);
router.put('/:solution_id/favourited', controller.putFavouritedUpOrDown);

module.exports = router;