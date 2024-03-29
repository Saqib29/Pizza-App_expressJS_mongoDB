
function cartController(){
    return {
        index(req, res) {
            res.render('customers/cart');
        },

        update(req, res) {

            // creating cart for the first time & adding basic object stracture
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                };
            }

            let cart = req.session.cart;

            // console.log(req.body);
            // check if item exists in the cart or not?
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }

                cart.totalQty += 1;
                cart.totalPrice += req.body.price;
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }

             res.json({ totalQty : req.session.cart.totalQty });
        }
    }
}

module.exports = cartController;