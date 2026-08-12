const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelizeOptions = {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
};

if (dbConfig.ssl) {
    sequelizeOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    };
}

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    sequelizeOptions
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const modelos = require("./models.js")(sequelize, Sequelize);

db.contenido = modelos.Contenido;
db.usuarios = modelos.Usuario;

module.exports = db;