//const Model = require('../model/users.model');

module.exports = {
    getAllUsers(req, res) {
        return res.status(200).send('get all users!')
    },
    getUserByUsername(req, res) {
        const { username } = req.params;
        return res.status(200).send(`return user with username ${username}`);
    },
    getFavouritesByUsername(req, res) {
        const { username } = req.params;
        return res.status(200).send(`return favourites for user with username ${username}`);
    },
    postNewUser(req, res) {
        return res.status(201).send({ New_User: req.body });
    }
}