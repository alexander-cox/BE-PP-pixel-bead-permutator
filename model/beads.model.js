const db = require('../config/db.config');

module.exports = {
    getAllBeads() {
        return db.many('SELECT * FROM beads;');
    },
    postBeadsBySolutionID(beadsArr) {
        return db.tx(t => {
            const inserts = beadsArr.map(user => {
                const { solution_id, bead_id, x, y } = user;
                return t.none('INSERT INTO solution_beads(solution_id, bead_id, x, y) VALUES($1, $2, $3, $4)', [solution_id, bead_id, x, y]);
            });
            return t.batch(inserts);
        })
    },
    getSolutionBeadsBySolutionID(solution_id) {
        return db.many('SELECT * FROM solution_beads;')
    }
}