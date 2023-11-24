//DEPENDENCIES
const { Router } = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const router = Router();
const fs = require('fs');
//CONTROLLERS
const { addUsersDB, loginUser } = require('../controllers/index')


router.get("/", (req, res) => {
    res.render('main', {
        titulo: 'Inicio con HBS',
        prueba: 'probando algo'
    })
});

router.post('/register', addUsersDB)
router.post('/signin', loginUser)

router.get("/equipo", (req, res) => {
    res.render('equipo', {
        equipo: [
            {
                id: 1,
                nombre: 'Juanito',
                habilidad: ['Javascript', 'Node.js']
            },
            {
                id: 2,
                nombre: 'Pedrito',
                habilidad: ['Php', 'Laravel']
            }
        ]
    })
});


router.get('/servicio', (req, res) => {
    res.render('servicio', {
        servicio: {
            estado: false,
            nombre: 'Servicio de programación'
        }
    })
})

router.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    })
})


module.exports = router