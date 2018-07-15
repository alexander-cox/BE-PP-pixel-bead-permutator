const router = require('express').Router();

router.get('/', (req, res) => {
    return res.status(200).send('You made it to solutions!!');
});

module.exports = router;