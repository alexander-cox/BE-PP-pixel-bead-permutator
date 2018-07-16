const Model = require('../model/beads.model');

module.exports = {
    getAllAvailableBeads(req, res, next) {
        return Model.getAllBeads()
            .then(beads => res.status(200).send(beads))
            .catch(next)
    },
    getTempSolutionByImageURL(req, res) {
        const { url } = req.query;
        return res.status(200).send({ solution_id: 1, url, belongs_to: 12 });
    },
    getBeadsBySolutionID(req, res, next) {
        const { solution_id } = req.params;
        return Model.getSolutionBeadsBySolutionID(solution_id)
            .then(beads => res.status(200).send(beads))
            .catch(next);
    },
    postBeadsBySolutionID(req, res, next) {
        const { solution_id } = req.params;
        console.log(req.body);
        return Model.postBeadsBySolutionID(req.body)
            .then(beads => {
                return res.status(201).send({ insert_count: beads.length , solution_id })
            })
            .catch(next);
    }
}