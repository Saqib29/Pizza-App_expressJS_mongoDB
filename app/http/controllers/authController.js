const User = require('../../models/user');


function authController() {

    return {
        login(req, res) {
            res.render('auth/login');
        },

        register(req, res) {
            res.render('auth/registration');
        },

        postController(req, res){
            const { name, email, password } = req.body;

            // validate request
            if(!name || !email || !password){
                req.flash('error', 'All fields must required');
                req.flash('name', name);
                req.flash('email', email);
                 res.redirect('/register');
            } 
            
            
            console.log(req.body);
        }

    }
}


module.exports = authController;