// require passport for authentication
const passport = require('passport');
// passport uses strategies to authenticate, use the passport local strategy for this application
const LocalStrategy = require('passport-local').Strategy;

// require the database
const db = require('../models');

/* Tell passport that we want to use a local strategy.
In other words we want to be able to log on using a username and password */
passport.use(new LocalStrategy(
    // my users will log on using a username
    {
        usernameField: 'username'
    },
    function(username, password, done) {
        // when the user tries to sign in find that user from the database
        db.User.findOne({
            where: {
                username: username
            }
        }).then(dbUser => {
            // if there is no user with the given username
            if (!dbUser) {
                return done(null, false, {
                    message: 'Incorrect Username'
                })
            } else
            // if the password entered does not match
            if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect Password'
                })
            }
            // if none of the above just return the user
            else {
                return done(null, dbUser);
            }
        });
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// export the configured passport
module.exports = passport;