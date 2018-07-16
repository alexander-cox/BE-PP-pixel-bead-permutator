module.exports = {
    getAllSolutions(req, res) {
        const { title, tags } = req.query;
        if(title && tags) {
            return res.status(200).send(`get all the solutions with title: ${title}, & hastags: ${tags}`)
        } else if (title) {
            return res.status(200).send(`get all the solutions with title: ${title}`)
        } else if (tags) {
            return res.status(200).send(`get all the solutions with hastags: ${tags}`)
        } else {
            return res.status(200).send('You get all the solutions!!');
        }
    },
    getSolutionByID(req, res) {
        const { solution_id } = req.params;
        return res.status(200).send(`get solution with solution id: ${solution_id}`);
    },
    getSolutionsByUserID(req, res) {
        const { user_id } = req.params;
        return res.status(200).send(`get all solutions for user ${user_id}`);
    },
    getTempSolutionByImageURL(req, res) {
        const { url } = req.query;
        return res.status(200).send({ solution_id: 1, url, belongs_to: 12 });
    },
    getBeadsBySolutionID(req, res) {
        const { user_id, solution_id } = req.params;
        return res.status(200).send(`get all the beads for the solution with ID ${solution_id}`);
    },
    postSolutionByUserID(req, res) {
        const { user_id } = req.params;
        return res.status(201).send({ New_Solution: {...req.body, user_id}});
    },
    putVoteUpOrDown(req, res) {
        const { decrement } = req.query;
        const { solution_id } = req.params;
        let strIncOrDec;
        decrement === 'true' ? strIncOrDec = 'decrement' : strIncOrDec = 'increment';
        return res.status(201).send(`${strIncOrDec} votes for solution with id ${solution_id} by 1`);
    },
    putFavouritedUpOrDown(req, res) {
        const { decrement } = req.query;
        const { solution_id } = req.params;
        let strIncOrDec;
        decrement === 'true' ? strIncOrDec = 'decrement' : strIncOrDec = 'increment';
        return res.status(201).send(`${strIncOrDec} favourite count for solution with id ${solution_id} by 1`);
    }
}