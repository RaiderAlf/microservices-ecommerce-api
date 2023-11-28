//DEPENDENCIES
const { Router } = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = Router();
const fs = require('fs');
//CONTROLLERS
const { addUsersDB, loginUser, allUser } = require('../controllers/index')


//ADMIN RENDER
router.get("/", (req, res) => {
    res.render('main', {
        titulo: 'Plataforma de administracion de usuarios en Ecommerce'
    })
});
router.get("/users", allUser);

//END-POINTS
router.post('/register', addUsersDB)
router.post('/signin', loginUser)




router.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    })
})


module.exports = router