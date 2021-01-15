
function initRoutes(app){
    app.get('/', (req, res) => {
        res.render('home');
    });

    
    app.get('/cart', (req, res) => {
        res.render('customers/cart');
    });

    // Login 
    app.get('/login', (req, res) => {
        res.render('auth/login');
    });

    // Register
    app.get('/register', (req, res) => {
        res.render('auth/registration');
    });

}


module.exports = initRoutes;