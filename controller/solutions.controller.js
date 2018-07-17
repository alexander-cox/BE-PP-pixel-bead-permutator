const Model = require('../model/solutions.model');

module.exports = {
    getAllSolutions(req, res, next) {
        const { title, tags } = req.query;
        if (title && tags) {
            return Model.getAllSolutionsByTitleAndTags(title, tags.split(' '))
                .then(solutions => res.status(200).send(solutions))
                .catch(next);
        } else if (title) {
            return Model.getAllSolutionsByTitle(title)
                .then(solutions => res.status(200).send(solutions))
                .catch(next);
        } else if (tags) {
            return Model.getAllSolutionsByTags(tags.split(' '))
                .then(solutions => res.status(200).send(solutions))
                .catch(next)
        } else {
            return Model.getAllSolutions()
                .then(solutions => res.status(200).send(solutions))
                .catch(next);
        }
    },
    getSolutionByID(req, res, next) {
        const { solution_id } = req.params;
        return Model.getSolutionByID(solution_id)
            .then(solution => res.status(200).send(solution))
            .catch(next);
    },
    getSolutionsByUserID(req, res, next) {
        const { user_id } = req.params;
        return Model.getSolutionsByUserID(user_id)
            .then(solutions => res.status(200).send(solutions))
            .catch(next);
    },
    postSolution(req, res, next) {
        return Model.postSolution(req.body)
            .then(solution => res.status(200).send(solution))
            .catch(next);
    },
    putVoteUpOrDown(req, res, next) {
        const { decrement } = req.query;
        const { solution_id } = req.params;
        if (decrement === 'true') {
            return Model.putDecrementVotesByOne(solution_id)
                .then(solution => res.status(201).send(solution))
                .catch(next);
        } else {
            return Model.putIncrementVotesByOne(solution_id)
                .then(solution => res.status(201).send(solution))
                .catch(next);
        }
    },
    putFavouritedUpOrDown(req, res, next) {
        const { decrement } = req.query;
        const { solution_id } = req.params;
        if (decrement === 'true') {
            return Model.putDecrementFavouritedByOne(solution_id)
                .then(solution => res.status(201).send(solution))
                .catch(next);
        } else {
            return Model.putIncrementFavouritedByOne(solution_id)
                .then(solution => res.status(201).send(solution))
                .catch(next);
        }
    }
}