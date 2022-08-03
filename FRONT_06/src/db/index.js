const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config, {logging: console.log});
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelDefiners = [
    require('./models/user.js'),
    // Add more models.old here...
    // require('./models.old/item'),
];

// We define all models.old according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

// We execute any extra setup after the models.old are defined, such as adding associations.
// applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;