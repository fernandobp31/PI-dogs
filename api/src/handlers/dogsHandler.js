//Este handler debe tener y mostrar mis Dogs.
//Para eso, necesita tener una logica interna la cual cree en otra carpeta de Controllers. Importé el Controller el cual controla la logica de este handler.

const { getBreeds, getBreedsByName, getBreedById, createNewDog }= require("../controllers/dogsController")

//Este handler debe obtener todas las Breeds. Puede recibir un query. En este caso, recibe solo los nombres y puede traer data desde la Api y la DB.
const getBreedsHandler= async (req, res)=> {
    const {name} = req.query;
    try {
        if(!name){
            let result= await getBreeds();
            return res.status(200).json(result)
        }
        else{
            let result= await getBreedsByName(name);
            return res.status(200).json(result)
        }         
    } catch (error) {
        res.status(404).json({error: error.message})
    }
};

//Este handler debe obtener una Breed por su id. Tambien recibe un parametro y puede traer la data desde la Api y la DB
const getRazaByIdHandler= async (req, res)=> {
    const {idRaza} = req.params
    let origin= isNaN(idRaza) ? "db" : "api";
    
    try {
        let result= await getBreedById(idRaza, origin);

        if(result.error) throw new Error(result.error);

        res.status(200).json(result)    
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

//Este ultimo handler debe crear un nuevo Dog o Breed. Puede recibir informacion desde el body y guarda los nuevos Dogs en la DB

const createNewDogHandler= async (req, res)=> {
    let { weightMin, weightMax, height, name, life_span, image, temperaments, from_DB }= req.body;
    try {
        await createNewDog(weightMin, weightMax, height, name, life_span, image, temperaments)
        res.status(201).send("New dog successfully created")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports= {
    getBreedsHandler,
    getRazaByIdHandler,
    createNewDogHandler
}