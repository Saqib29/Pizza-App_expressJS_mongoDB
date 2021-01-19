require('dotenv').config();
const express           = require('express');
const app               = express();
const path              = require('path');
const ejs               = require('ejs');
const expressLayout     = require('express-ejs-layouts');
const mongoose          = require('mongoose');
const session           = require('express-session');
const flash             = require('express-flash');
const SessionStore      = require('connect-mongo')(session);
const passport          = require('passport');



const PORT = process.env.PORT || 3000;

// Database connection
const url = process.env.DB;
// 'mongodb://localhost:27017/pizza';

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
}).catch(err => {
    console.log('connection failed');
});

// Middlewares

// Passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());

// Sesion store
let sessionStore = new SessionStore({
    mongooseConnection : connection,
    collection : 'sessions'
});

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 60 * 60 * 24 }
}));

// Global middlewares
app.use((req, res, next) => {
    res.locals.session = req.session;

    next();
});

app.use(flash()); 

// set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// fatching web routes
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});