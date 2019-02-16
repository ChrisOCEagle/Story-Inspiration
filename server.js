// require express for the server
const express = require('express');
// passport uses sessions for authentication
const session = require('express-session');
// require passport as configured
const passport = require('./config/passport.js');
// require path for serving up React
const path = require('path');

// set up the port
const PORT = process.env.PORT || 3001;
// require the models for syncing
const db = require('./models');

// create the express app
var app = express();

/* configure the middlware
===================================================== */
// configure the bodyparser for incoming url requests
app.use(express.urlencoded({ extended: true }));
// configure the bodyparser for incoming json requests
app.use(express.json());
// configure the static files
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
// use sessions to keep track of a user's login status
app.use(session({
    secret: 'Eagle',
    resave: true,
    saveUninitialized: true
}));
// initialize passport
app.use(passport.initialize());
// use the passport session
app.use(passport.session());

// require the api routes
require('./routes/api-routes')(app);
app.use((req, res) => res.sendFile(path.join(__dirname, 'client/build/index.html')));

// sync to the database
db.sequelize.sync().then(() => {
    // log a message to the user upon success
    app.listen(PORT, () => {
        console.log(`==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
    });
});