module.exports = function(sequelize, DataTypes) {
    const Stories = sequelize.define('Stories', {
        // there will be an id for identification
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        // there will be a stories column for each story
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        story: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // there will also be a share column that is a boolean value that is defaulted to false
        share: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    /* there will be two foreign keys,
    one for the user that created the story and the other for the prompt that is associated with the story */
    Stories.associate = models => {
        Stories.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

        Stories.belongsTo(models.Prompts, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Stories;
};