const { Router } =  require ("express");

//Cree el router de Temperaments, el cual tiene todos los handler req y res y todas las respuestas que son apuntadas a la route /temperaments
//Para esto, importé el handler el cual maneja los Temperaments

const {getAllTempHandlers} = require("../handlers/tempHandler")

//temp router

const tempRouter= Router();

tempRouter.get("/", getAllTempHandlers);//Este router debe obtener todos los Temperaments desde la Api y la DB

module.exports = tempRouter;