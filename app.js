const express           = require('express');
const app               = express();
const path              = require('path');
const ejs               = require('ejs');
const expressLayout     = require('express-ejs-layouts');
const mongoose          = require('mongoose');


const PORT = process.env.PORT || 3000;

// Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
}).catch(err => {
    console.log('connection failed');
});


// Assets
app.use(express.static('public'));


// set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// fatching web routes
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});