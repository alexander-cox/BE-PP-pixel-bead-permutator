const db =  process.env.DATABASE_URL || require('../config/db.config');

module.exports = {
    getAllSolutions() {
        return db.many('SELECT * FROM solutions;');
    },
    getAllSolutionsByTitle(title) {
        return db.any(`SELECT * FROM solutions WHERE title LIKE '%' || $1 || '%';`, [title]);
    },
    getAllSolutionsByTags(tagsArr) {
        const lowerCaseTags = tagsArr.map(tag => tag.toLowerCase());
        const QueryCondStr = lowerCaseTags.map((_, i) => `tags LIKE '%' || $${i + 1} || '%'`).join(' AND ');
        return db.any(`SELECT * FROM solutions WHERE ${QueryCondStr};`, lowerCaseTags);
    },
    getAllSolutionsByTitleAndTags(title, tagsArr) {
        const lowerCaseTags = tagsArr.map(tag => tag.toLowerCase());
        const QueryCondStr = lowerCaseTags.map((_, i) => `tags LIKE '%' || $${i + 2} || '%'`).join(' AND ');
        return db.any(`SELECT * FROM solutions WHERE LOWER(title) LIKE '%' || $1 || '%' AND ${QueryCondStr};`, [title.toLowerCase(), ...lowerCaseTags]);
    },
    getSolutionByID(solution_id) {
        return db.one('SELECT s.id, s.title, s.users_id, s.image_url, s.votes, s.is_public, s.tags, s.brand, s.width_px, s.height_px, s.favourited, s.created_at, u.username, u.avatar_url FROM solutions AS s JOIN users AS u ON s.users_id=u.id WHERE s.id = $1', solution_id);
    },
    getSolutionsByUserID(users_id) {
        return db.any('SELECT * FROM solutions WHERE users_id = $1', users_id);
    },
    postSolution(solutionObj) {
        const { title, users_id, image_url, is_public, tags, brand, width_px, height_px } = solutionObj;
        return db.one('INSERT INTO solutions (title, users_id, image_url, is_public, tags, brand, width_px, height_px) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
            [title, users_id, image_url, is_public, tags, brand, width_px, height_px]);
    },
    putIncrementVotesByOne(solution_id) {
        return db.one('UPDATE solutions SET votes = votes + 1 WHERE id = $1 RETURNING *;', [solution_id]);
    },
    putDecrementVotesByOne(solution_id) {
        return db.one('UPDATE solutions SET votes = (CASE WHEN (votes <= 1) THEN 0 ELSE (votes - 1) END) WHERE id = $1 RETURNING *;', [solution_id]);
    },
    putIncrementFavouritedByOne(solution_id) {
        return db.one('UPDATE solutions SET favourited = favourited + 1 WHERE id = $1 RETURNING *;', [solution_id]);
    },
    putDecrementFavouritedByOne(solution_id) {
        return db.one('UPDATE solutions SET favourited = (CASE WHEN (favourited <= 1) THEN 0 ELSE (favourited - 1) END) WHERE id = $1 RETURNING *;', [solution_id]);
    }
}