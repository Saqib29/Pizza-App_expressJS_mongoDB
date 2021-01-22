const Order = require('../../../models/order');


function orderController(){
    return {
        store(req, res) {
            console.log(req.body);
        }
    }
}


module.exports = orderController;