const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');


function authController() {

    return {
        login(req, res) {
            res.render('auth/login');
        },

        postLogin(req, res, next) {
            const { email, password } = req.body;

            // validate request
            if(!email || !password){
                req.flash('error', 'All fields must required');
                return res.redirect('/login');
            }     

            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message);
                    // console.log('main error');
                    return next(err);
                }

                if(!user) {
                    req.flash('error', info.message);
                    // console.log('user not found!');
                    return  res.redirect('/login');
                }

                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message);
                        // console.log('login error');
                        return next(err);
                    }

                    return  res.redirect('/');
                });
            })(req, res, next);
        },

        register(req, res) {
            res.render('auth/registration');
        },

        async postRegister(req, res){
            const { name, email, password } = req.body;

            // validate request
            if(!name || !email || !password){
                req.flash('error', 'All fields must required');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            } 
            
            // Check does email exist or not in the database
            User.exists({ email : email }, (err, result) => {
                if(result){
                    req.flash('error', 'Email already exists');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register');
                }
            });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = new User({
                name,
                email,
                password: hashedPassword
            });

            user.save().then(() => {
                // Login
                return  res.redirect('/');

            }).catch(err => {
                req.flash('error', 'Something went wrong!');
                return  res.redirect('/register');
            });

            // console.log(req.body);
        },

        logout(req, res) {
            //  logout appeared for passport
            req.logout();

            return res.redirect('/');
        }

    }
}


module.exports = authController;