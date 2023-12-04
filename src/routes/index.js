//DEPENDENCIES
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { loginPag, titlePag, addUsersDB, loginUser, allUser, DeletedUser } = require('../controllers/index')
//MIDDLEWARE
const { authenticated } = require('../middleware/index');


// ------------------------------------ ADMIN RENDER
//GET
router.get("/", loginPag)
router.get("/main", authenticated, titlePag);
router.get("/users", authenticated, allUser);

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../db');


passport.use(new LocalStrategy(
    async function (req, res, done) {
        const { email } = req.body
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


//POST
router.post('/main', passport.authenticate('local', { successRedirect: '/main', failureRedirect: '/main' }));


// --------------------------------  END-POINTS

//POST
router.post('/register', addUsersDB)
router.post('/signin', loginUser)

//DELETE
router.delete('/register', DeletedUser)



// -------------------------------  NOT FOUND
router.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    })
})


module.exports = router