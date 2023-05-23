const { Router } = require('express');
const dogsRouter = require("./dogsRouter");
const tempRouter = require("./tempRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();

router.use('/dogs', dogsRouter); //Todos los links que usan Dogs vienen a este router
router.use('/temperaments', tempRouter)//Todos los links que usan Temperaments vienen a este router

module.exports = router;
