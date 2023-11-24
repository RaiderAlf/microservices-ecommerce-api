//IMPORTS
require('dotenv').config();
const { DB_USER, DB_HOST, DB_PASSWORD, DB } = process.env;
const { Sequelize } = require('sequelize');

//MODELS
const UsersModel = require('./models/users.js');

//CONN DB POSTGRESQL
const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB}`, {
    logging: false,
    native: false
});

//INJECT MODELS TO DB
UsersModel(database);

// //RELATIONS MODELS
// const { Users } = database.models;

// // // RELATIONS CREATOR & USER
// Users.belongsToMany(Creators, {through : 'subs'});
// Creators.belongsToMany(Users, {through : 'subs'});

module.exports = {
    ...database.models,
    database
};