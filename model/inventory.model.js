const db = require('../config/db.config');

module.exports = {
    getAllInventoryItems() {
        return db.many('SELECT * FROM inventory');
    },
    getInventoryBeadsByUserID(userID) {
        return db.many('SELECT i.id AS id, i.bead_id, b.brand, b.colour_name, b.hex, b.size, b.source_url, style, b.r, b.g, b.b, b.transparent, i.users_id, quantity FROM inventory AS i JOIN beads AS b ON i.bead_id=b.id WHERE i.users_id=$1;', [userID]);
    },
    putIncrementInventoryQuantity(inv_id, quantity) {
        return db.one('UPDATE inventory SET quantity = quantity + $1 WHERE id=$2 RETURNING *;', [quantity, inv_id]);
    },
    putDecrementInventoryQuantity(inv_id, amount) {
        return db.one('UPDATE inventory SET quantity = (CASE WHEN (quantity <= $1) THEN 0 ELSE (quantity - $1) END) WHERE id=$2 RETURNING *;', [amount, inv_id]);
    },
    postNewIntentoryItem(invObj) {
        const { users_id, bead_id, quantity } = invObj;
        return db.one('INSERT INTO inventory (users_id, bead_id, quantity) VALUES ($1, $2, $3) RETURNING *;',
            [users_id, bead_id, quantity]);
    }
}