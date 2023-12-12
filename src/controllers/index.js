//DEPENDENCIES
require('dotenv').config();
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//SERVICES
const { getDB, getAllDB, addDB, delDB } = require('../services/index')


//RENDER HBS
const allUser = async (req, res) => {

    res.render('users', {
        users: await getAllDB()
    })
}

const titlePag = async (req, res) => {
    res.render('main', {
        titulo: 'Plataforma de administracion de usuarios en Ecommerce'
    })
}

const loginPag = async (req, res) => {
    res.render('login')
}


//RESPONSE SERVER
const addUsersDB = async (req, res) => {
    const { firstname, lastname, email, password } = req.body

    try {
        res.status(201).send({
            message: "USER CREATED!",
            data: await addDB(firstname, lastname, email, password, null)
        })
    } catch (error) {
        res.status(400).send({
            message: "ERROR!",
            data: error.message
        })
    }
}

const loginUser = async (req, res) => {
    if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("pass")) {
        try {
            const { email, pass } = req.body
            const users = await getDB()

            for (let i = 0; i < users.length; i++) {
                if (users[i]["email"] === email) {

                    bcrypt.compare(pass, users[i]["password"], function (err, pas) {
                        if (pas) {

                            res.json({
                                message: "User Found",
                                data: users[i]
                            })
                            return;

                        } else {

                            res.status(400).send({
                                ERROR: err,
                                message: "Invalid Password"
                            });
                            return;

                        }

                    });
                    return
                }
            }

            res.status(404).send({
                ERROR: "Error",
                message: "User not found"
            });

        } catch (error) {
            res.status(404).send({
                titulo: 'ERROR',
                message: error.message
            });
        }
        return;
    } else {
        res.status(400).send({
            ERROR: "ERROR",
            message: "Missing Data"
        })
    }
}

const loginServer = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
}

const DeletedUser = async (req, res) => {
    if (req.body.hasOwnProperty("id")) {
        const { id } = res.body
        try {
            res.status(201).send({
                message: "USER CREATED!",
                data: await delDB(id)
            })
        } catch (error) {
            res.status(404).send({
                message: "ERROR!",
                data: error.message
            })
        }
    }

}



module.exports = {
    loginPag,
    titlePag,
    allUser,
    addUsersDB,
    loginUser,
    DeletedUser
}