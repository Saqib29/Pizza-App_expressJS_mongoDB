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
const Emitter           = require('events');



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


// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());

// Sesion store
let sessionStore = new SessionStore({
    mongooseConnection : connection,
    collection : 'sessions'
});

// Event emitter
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 60 * 60 * 24 }
}));

// Passport config
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// Global middlewares
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

app.use(flash()); 

// set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// fatching web routes
require('./routes/web')(app);

const server =  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});


// Socket.io
const io = require("socket.io")(server);

io.on('connection', (socket) => {
    // join
    // console.log(`socket.id - ${socket.id}`);
    socket.on('join', (roomName) => {
        // console.log(`roomName - ${roomName}`);
        
        socket.join(roomName);
    });
});

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data);
})