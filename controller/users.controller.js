const Model = require('../model/users.model');

module.exports = {
    getAllUsers(req, res, next) {
        Model.getAllUsers()
        .then(users => res.status(200).send(users))
        .catch(next);
    },
    getUserByUsername(req, res, next) {
        const { username } = req.params;
        Model.getUserByUsername(username)
        .then(user => res.status(200).send(user))
        .catch(next); 
    },
    getFavouritesByUserID(req, res, next) {
        const { user_id } = req.params;
        Model.getFavouritesByUserID(user_id)
        .then(favourites => res.status(200).send(favourites))
        .catch(next);
    },
    postNewUser(req, res) {
        return res.status(201).send({ New_User: req.body });
    }
}