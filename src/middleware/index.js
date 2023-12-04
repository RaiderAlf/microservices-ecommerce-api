//DEPENDENCIES
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../db');


passport.use(new LocalStrategy(
    async function (email, pass, done) {
        try {
            const users = await Users.findOne({ where: { email: email } });

            if (!users) {
                return done(null, false, { message: "Usuario no encontrado" })
            };

            return done(null, users);

        } catch (error) {
            return done(err)
        }
    }
));

const authenticated = (req, res, next) => {
    // if (req.isAuthenticated()) {
    //     return next();
    // } else {
    //     // Redirige al usuario a la página de inicio de sesión si no está autenticado
    //     res.redirect('/');
    // }
    return next();
}

module.exports = { passport, authenticated }