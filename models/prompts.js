module.exports = function(sequelize, DataTypes) {
    // define the prompts model
    const Prompts = sequelize.define('Prompts', {
        // there will be a column for an id to identify each prompt
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        // there will be a column for the link to determine if a prompt is an image
        src: {
            type: DataTypes.STRING,
            unique: true
        },
        alt: {
            type: DataTypes.STRING,
            unique: true
        },
        // there will be a column for the title of the prompt
        title: {
            type: DataTypes.STRING(),
            unique: true
        },
        text: {
            type: DataTypes.STRING(1000),
            unique: true
        },
    });
    Prompts.associate = models => {
        Prompts.hasMany(models.Stories, {});
    };
    return Prompts;
}