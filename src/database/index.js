const Sequelize = require('sequelize');
const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_DIALECT,
    operatorsAliases: false,
  
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        evict: 10000,
        handleDisconnects: true
    }
});

const user = sequelize.define('user', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
    },
    name: { 
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    email: { 
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    password: { 
        type: Sequelize.STRING(50),
        allowNull: false
    },
    avatar: Sequelize.STRING(255),
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.model = { user };

module.exports = db;