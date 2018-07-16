const router = require('express').Router();
const controller = require('../controller/inventory.controller');

router.get('/', controller.getAllInventoryItems);
router.get('/:user_id', controller.getInventoryItemsByUserID);
router.put('/:inv_id', controller.putIncOrDecBeadsByInvID);
router.post('/', controller.postInventoryItemByUserID);

module.exports = router;