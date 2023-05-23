//Este handler debe obtener todos los temperaments desde la Api y enviarlas a mi DB
//Para eso, necesita tener una logica interna la cual cree en otra carpeta de Controllers. Importé el Controller el cual controla la logica de este handler.

const {gettingAlltempsfromApi}= require ("../controllers/tempController")

//Creacion del handler

const getAllTempHandlers= async(req, res)=>{
try {
    let result= await gettingAlltempsfromApi()
    await res.status(200).json(result)
} catch (error) {
    res.status(404).send(error)
}
}

module.exports= {getAllTempHandlers};