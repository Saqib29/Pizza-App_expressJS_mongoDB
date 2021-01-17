
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

            

             res.json({ data: "all ok"});
        }
    }
}

module.exports = cartController;