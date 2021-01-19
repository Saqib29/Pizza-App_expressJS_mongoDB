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
            
            // Check does email exist or not in the database
            User.exists({ email : email }, (err, result) => {
                if(result){
                    req.flash('error', 'Email already exists');
                    req.flash('name', name);
                    req.flash('email', email);
                     res.redirect('/register');
                }
            });            
            console.log(req.body);
        }

    }
}


module.exports = authController;