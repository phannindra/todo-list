const { Sequelize } = require('sequelize');
const env = process.env
const sequelize = new Sequelize(
    env.DBNAME, env.DBUSER, env.DBPASS, {
    host: env.DBHOST,
    dialect: 'mysql'
});

module.exports = sequelize