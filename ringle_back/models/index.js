const Sequelize = require("sequelize")
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env]
const db = {}

const Vocabulary =  require('./vocabulary');

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,  
);

db.sequelize = sequelize;

db.Vocabulary = Vocabulary;

Vocabulary.init(sequelize);
module.exports = db;