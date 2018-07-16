const router = require('express').Router();

router.get('/', (req, res) => {
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
});

router.get('/:solution_id', (req, res) => {
    const { solution_id } = req.params;
    return res.status(200).send(`get solution with solution id: ${solution_id}`);
})

router.get('/user/:user_id', (req, res) => {
    const { user_id } = req.params;
    return res.status(200).send(`get all solutions for user ${user_id}`);
});

router.get('/beads/temp', (req, res) => {
    const { url } = req.query;
    return res.status(200).send({ solution_id: 1, url, belongs_to: user_id });
});

//get beads with solutionID
router.get('/:user_id/beads/:solution_id', (req, res) => {
    const { user_id, solution_id } = req.params;
    return res.status(200).send(`get all the beads for the solution with ID ${solution_id}`);
});

router.post('/user/:user_id', (req, res) => {
    const { user_id } = req.params;
    return res.status(201).send({ New_Solution: {...req.body, user_id}});
});

router.put('/:solution_id/votes', (req, res) => {
    const { decrement } = req.query;
    const { solution_id } = req.params;
    let strIncOrDec;
    decrement === 'true' ? strIncOrDec = 'decrement' : strIncOrDec = 'increment';
    return res.status(201).send(`${strIncOrDec} votes for solution with id ${solution_id} by 1`);
});

router.put('/:solution_id/favourited', (req, res) => {
    const { decrement } = req.query;
    const { solution_id } = req.params;
    let strIncOrDec;
    decrement === 'true' ? strIncOrDec = 'decrement' : strIncOrDec = 'increment';
    return res.status(201).send(`${strIncOrDec} favourite count for solution with id ${solution_id} by 1`);
});

module.exports = router;