const express           = require('express');
const app               = express();
const path              = require('path');
const ejs               = require('ejs');
const expressLayout     = require('express-ejs-layouts');



const PORT = process.env.PORT || 3000;

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