//DEPENDENCIES
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
//MODELS
const { Users } = require('../db');
const { use } = require('../routes');

//--------------------------------------------------------------

const sanitizeRes = async (data) => {
    const parse = JSON.stringify(data)
    return JSON.parse(parse)
}

const cryptPass = async (pass, saltRounds = 10) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(pass, salt)
    } catch (error) {
        console.log(error)
    }
    return null
}

const getAllDB = async () => {
    const users = await Users.findAll({ attributes: ["id", "firstname", "lastname", "avatar", "email", "password", "createdAt", "deleted"] })
    return sanitizeRes(users)
}

const getDB = async () => {

    const users = await Users.findAll({ where: { deleted: false }, attributes: ["id", "firstname", "lastname", "avatar", "email", "password"] });
    if (!users[0]) {
        throw new Error('Ningun usuario registrado');
    };
    return sanitizeRes(users);
}

const addDB = async (firstname, lastname, email, password, avatar) => {
    try {
        const passHash = await cryptPass(password)

        const userCreated = await Users.create({
            firstname,
            lastname,
            email,
            password: passHash,
            avatar: avatar
        });
        return sanitizeRes(userCreated)
    } catch (error) {
        throw error
    }
}

module.exports = { getAllDB, getDB, addDB }