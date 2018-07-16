module.exports = {
    getAllAvailableBeads(req, res) {
        return res.status(200).send('get all beads');
    },
    getTempSolutionByImageURL(req, res) {
        const { url } = req.query;
        return res.status(200).send({ solution_id: 1, url, belongs_to: 12 });
    },
    getBeadsBySolutionID(req, res) {
        const { user_id, solution_id } = req.params;
        return res.status(200).send(`get all the beads for the solution with ID ${solution_id}`);
    },
    postBeadsBySolutionID(req, res) {
        const { solution_id } = req.params;
        return res.status(201).send({ Beads: { ...req.body, solution_id } });
    }
}