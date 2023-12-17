//DEPENDENCIES
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Users } = require('../db');
const { Router } = require('express');
const router = Router();
//CONTROLLERS
const { loginPag, titlePag, createUserPag, addUsersDB, loginUser, allUser, DeletedUser } = require('../controllers/index')
//MIDDLEWARE
const { authenticated } = require('../middleware/index');

//PASSPORT MIDDLEWARE
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

// ------------------------------------ ADMIN RENDER
//GET
router.get("/", loginPag)
router.get("/main", authenticated, titlePag);
router.get("/users", authenticated, allUser);
router.get("/create", authenticated, createUserPag);



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