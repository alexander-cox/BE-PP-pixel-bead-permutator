const db = require(`../config/db.config.js`);

module.exports = {
    getAllUsers() {
        return db.many('SELECT * FROM users;');
    },
    getUserByUsername(username) {
        return db.one('SELECT * FROM users WHERE username = $1', [username]);
    },
    getFavouritesByUserID(userID) {
        return db.many(`SELECT * FROM favourites AS f JOIN solutions as s ON f.solution_id=s.id WHERE f.users_id = ${ userID };`);
    }
}