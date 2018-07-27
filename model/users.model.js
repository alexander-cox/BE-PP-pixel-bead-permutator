const db = require('../db');

module.exports = {
    getAllUsers() {
        return db.many('SELECT * FROM users;');
    },
    getUserByUsername(username) {
        return db.one('SELECT * FROM users WHERE username = $1', [username]);
    },
    getUserByUserId(userID) {
        return db.one('SELECT * FROM users WHERE id = $1', [userID]);
    },
    getFavouritesByUserID(userID) {
        return db.many(`SELECT * FROM favourites AS f JOIN solutions as s ON f.solution_id=s.id WHERE f.users_id = ${userID};`);
    },
    postNewUser(userObj) {
        const { username, first_name, last_name, email, avatar_url } = userObj;
        return db.one('INSERT INTO users (username, first_name, last_name, email, avatar_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [username, first_name, last_name, email, avatar_url]);
    }
}