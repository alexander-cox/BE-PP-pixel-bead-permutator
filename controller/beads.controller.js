module.exports = {
    getAllAvailableBeads(req, res) {
        return res.status(200).send('get all beads');
    },
    postBeadsBySolutionID(req, res) {
        const { solution_id } = req.params;
        return res.status(201).send({ Beads: { ...req.body, solution_id } });
    }
}