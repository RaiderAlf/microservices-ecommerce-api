//DEPENDENCIES
require('dotenv').config();
const bcrypt = require('bcrypt');
//SERVICES
const { getDB, addDB } = require('../services/index')

const addUsersDB = async (req, res) => {
    const { firstname, lastname, email, password, file } = req.body

    console.log(firstname, lastname, email, password, file)

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
                                ERROR: "Invalid Password",
                                message: err
                            });
                            return;

                        }

                    });
                    return
                }
            }

            res.status(404).send({
                ERROR: "Error",
                message: "Usuario no encontrado"
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



module.exports = {
    addUsersDB,
    loginUser
}