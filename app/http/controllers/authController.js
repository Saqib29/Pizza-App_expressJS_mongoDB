
function authController() {

    return {
        login(req, res) {
            res.render('auth/login');
        },

        register(req, res) {
            res.render('auth/registration');
        }

    }
}


module.exports = authController;