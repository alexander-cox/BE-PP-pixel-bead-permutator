const Model = require('../model/beads.model');
const Utils = require('../utils/image-logic.utils');

module.exports = {
    getAllAvailableBeads(req, res, next) {
        return Model.getAllBeads()
            .then(beads => res.status(200).send(beads))
            .catch(next)
    },
    getTempSolutionByImageURL(req, res, next) {
        const { height, width, url  } = req.query;
        return Model.getAllBeads()
            .then(beads => Utils.imageToBeadArr(url, beads, width, height))
            .then(tempSolution => {
                res.status(200).send(tempSolution)
            })
            .catch(next);
    },
    getBeadsBySolutionID(req, res, next) {
        const { solution_id } = req.params;
        return Model.getSolutionBeadsBySolutionID(solution_id)
            .then(beads => res.status(200).send(beads))
            .catch(next);
    },
    postBeadsBySolutionID(req, res, next) {
        const { solution_id } = req.params;
        return Model.postBeadsBySolutionID(req.body, solution_id)
            .then(ids => res.status(201).send({ insert_count: ids.length, solution_id }))
            .catch(next);
    }
}