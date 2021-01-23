const order = require('../../../models/order');

function orderController() {
    return {
        index(req, res) {
            order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('custometId', '-password').exac((err, orders) => {
                res.render('admin/orders');
            });
        }
    }
}

module.exports = orderController;