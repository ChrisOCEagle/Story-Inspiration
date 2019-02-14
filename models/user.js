// require bcrypt for password hashing
const bcrypt = require('bcrypt-nodejs');

// create the User model
module.exports = function(sequelize, DataTypes) {
    // define the User in sequelize
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        // the user will sign in using a username and password, but will eventually be able to also use their email as a password
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        //     unique: true,
        //     validate: {
        //         isEmail: true
        //     }
        // },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    /* Create a custom method that will check if an unhashed password entered by the user
    can be compared to the hashed password stored in our database */
    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };
    // automatically hash a user's password before creation
    User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });
    User.associate = models => {
        User.hasMany(models.Stories, {});
    };
    return User;
};