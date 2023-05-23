const { Router } =  require ("express");

//Cree el dogs router el cual llama a todos los handlers con req y res que se usan la dogs routes. Para eso tengo que requerir todos los handlers usando en dogs.
const { getBreedsHandler, getRazaByIdHandler, createNewDogHandler} = require ("../handlers/dogsHandler")

//dog router

const dogsRouter = Router();

dogsRouter.get("/", getBreedsHandler);//Este handler llama a todos los breeds. Puede recibir un query. En este caso solo llama los nombres y trae data del Api y la DB
dogsRouter.get("/:idRaza", getRazaByIdHandler); //Este handler debe obtener un Id y puede recibir un parametro, tambien trae date desde el Api y la DB
dogsRouter.post("/", createNewDogHandler);//Este ultimo handler debe crear un nuevo Dog o Breed. Debe recibir informacion desde el body y guarda los nuevos Dogs en la DB


module.exports = dogsRouter;