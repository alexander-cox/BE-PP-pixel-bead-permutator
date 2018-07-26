const db = require('../db');

module.exports = {
    getAllBeads() {
        return db.many('SELECT * FROM beads;');
    },
    postBeadsBySolutionID(beadsArr, solution_id) {
        return db.tx(t => {
            const inserts = beadsArr.map(user => {
                const { bead_id, x, y } = user;
                return t.one('INSERT INTO solution_beads(solution_id, bead_id, x, y) VALUES($1, $2, $3, $4) RETURNING id', [solution_id, bead_id, x, y]);
            });
            return t.batch(inserts);
        })
    },
    getSolutionBeadsBySolutionID(solution_id) {
        return db.many('SELECT sb.id, sb.solution_id, sb.x, sb.y, sb.bead_id , b.colour_name, b.r, b.g, b.b FROM solution_beads AS sb LEFT JOIN beads AS b ON sb.bead_id = b.id WHERE sb.solution_id = $1 ORDER BY sb.y ASC, sb.x ASC;',
            [solution_id]);
    }
}