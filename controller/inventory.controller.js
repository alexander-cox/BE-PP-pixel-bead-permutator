module.exports = {
    getAllInventoryItems(req, res) {
        return res.status(200).send('Get All inventory list!!');
    },
    getInventoryItemsByUserID(req, res) {
        return res.status(200).send(`Get inventory of ${req.params.user_id}`);
    },
    putIncOrDecBeadsByInvID(req, res) {
        //use increment=true/false and amount=(int) on query string 
        const { increment, amount } = req.query;
        const { inv_id } = req.params;

        //TEMPORARY to test the routed method works...
        let strMove; 
        increment === 'true' ? strMove='increment' : strMove='decrement';
        return res.status(200).send(`${strMove} inventory number ${inv_id} by ${amount}`);
    },
    postInventoryItemByUserID(req, res) {
        return res.status(201).send({ Inventory_Updated_With: req.body});
    }
}