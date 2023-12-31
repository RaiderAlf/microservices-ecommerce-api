//DEPENDENCIES
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
//MODELS
const { Users } = require('../db');

//--------------------------------------------------------------

const sanitizeRes = async (data) => {
    const parse = JSON.stringify(data)
    return JSON.parse(parse)
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL
    }
});

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

        const mailOptions = {
            from: process.env.USER_EMAIL,
            to: email,
            subject: 'Welcome a Mobile Shop',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                <h1 style="font-size: 36px; color: #4CAF50;">Hello,</h1>
                <h3 style="font-size: 16px; color: #4CAF50;">${firstname} ${lastname}</h3>
                <p>Thank you for registering with our ecommerce. We're excited to have you with us.</p>
                <p>Here you will find a wide range of high-quality products. Browse our categories to discover the latest products and offers.</p>
                <p>If you have any questions or need help, our customer service team is ready to assist you.</p>
                <p style="font-weight: bold;">Happy shopping!</p>
                <p>Sincerely,</p>
                <p>The team at <span style="color: #70CD7E ;">Mobile Shop</span></p>
                </div>
            `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Correo enviado: ' + info.response);
            }
        });


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

const delDB = async (id) => {
    try {
        await Users.findByPk(id)
            .then(user => {
                if (!user) {
                    console.log('No se encontró el usuario');
                    return;
                }

                user.deleted = true;
                return user.save();
            })

            .then(user => {
                console.log('Usuario actualizado:', user);
                return sanitizeRes(user)
            })
            .catch(err => {
                throw err
            });

    } catch (error) {
        throw error
    }
}


module.exports = { getAllDB, getDB, addDB, delDB }