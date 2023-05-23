//En este archivo cree todo los controllers que usare en mi Dog Handlers
//Es un archivo el cual controla la logica en mi Dogs Route

require('dotenv').config();
const axios = require ("axios");
const {Dog}= require ("../db");
const {Temperament}= require ("../db");
const {API_KEY} = process.env

//Esta funcion trae toda la info (.data) desde la Api la cual necesito tener. Son los mismos criterios de información que utilicé para crear Dogs.
const getBreedsFromApi= async()=> {
    let apiData= await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    
        let fromApi= await apiData.data.map((inst)=>{
            let weightMin = parseInt(inst.weight.metric.slice(0, 2).trim()); 
            let weightMax = parseInt(inst.weight.metric.slice(4).trim());
            let averageWeight = weightMax + weightMin
        
            if (weightMin && weightMax) {
                averageWeight= averageWeight / 2;

            } else if (weightMin && !weightMax) {
                weightMax = weightMin;
                averageWeight= averageWeight / 2;

            } else if (!weightMin && weightMax) {
                weightMin = weightMax;
                averageWeight= averageWeight / 2;

            } else {
                if (inst.name === "Smooth Fox Terrier") {
                    weightMin = 8;
                    weightMax = 8;
                    averageWeight= ((weightMax) + (weightMin)) / 2;

                } else {
                    weightMin = 20;
                    weightMax = 30;
                    averageWeight= ((weightMax) + (weightMin)) / 2;

                }
            }

        return {
        id: inst.id,
        weightMin: weightMin,
        weightMax: weightMax,
        averageWeight: averageWeight,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image.url,
        temperament: inst.temperament
        }
    });
    return fromApi;
}


//Esta funcion trae toda la Data de la DB
const getBreedsFromDb= async()=> {
    let dbData= await Dog.findAll({
    include: [{
        model: Temperament,
        attributes: ["name"],
        through:{attributes: []},
       }],
    });

    let fromDb= dbData.map((inst)=>{
        return {
        id: inst.id,
        weightMax: inst.weightMax,
        weightMin: inst.weightMin,
        averageWeight: (Number(inst.weightMax) + Number(inst.weightMin))/2,
        height: inst.height,
        name: inst.name,
        life_span: inst.life_span,
        image: inst.image,
        temperament: inst.Temperaments? inst.Temperaments.map (el=> el.name).join(", "):"Happy",
        from_DB: true,
        }
    });
    return fromDb;
    
};


//Unifico en una función lo que viene de la API y lo que viene de la base de datos
const getBreeds= async() => {
    let breedsApi= await getBreedsFromApi();
    let breedsDb= await getBreedsFromDb();
    let breeds= breedsDb? [...breedsApi, ...breedsDb] : breedsApi;
    return breeds;
}


//Esta funcion trae unicamente la informacion relacionoada el nombre requirido. Si el nombre no existe mostrara un error.
const getBreedsByName= async (name)=>{
    
    let name2= name.toLowerCase();
    let breeds = await getBreeds();
    let result= await breeds.filter((inst)=> inst.name.toLowerCase().includes(name2));
        
    if(result.length){
        return result
    }
    else {
        throw new Error("This breed does not exist")
    }
};


//Esta funcion trae unicamente la informacion de la id requerida. Si la id no existe mostrara un error.
const getBreedById = async (id, origin) => {
	try {
		if (origin === 'db') {
			let dogDB = await Dog.findOne({
				where: {
					id: id,
				},
                include: [{
                    model: Temperament,
                    attributes: ["name"],
                    through:{attributes: []},
                   }],
			});

			if (dogDB) {
				return {
					id: dogDB.id,
					weightMax: dogDB.weightMax,
					weightMin: dogDB.weightMin,
                    averageWeight: (Number(dogDB.weightMax) + Number(dogDB.weightMin)) /2,
					height: dogDB.height,
					name: dogDB.name,
					life_span: dogDB.life_span,
					image: dogDB.image,
					temperament: dogDB.Temperaments
						? dogDB.Temperaments.map((el) => el.name).join(', ')
						: 'Happy',
					from_DB: true,
				}
			}
		} else {

			let result = await axios(
				`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
			);

            let perrito = result.data.find(el=> el.id === Number(id) );

				let weightMin = parseInt(perrito.weight.metric.slice(0, 2).trim());

				let weightMax = parseInt(perrito.weight.metric.slice(4).trim());

				let averageWeight = weightMax + weightMin;

				if (weightMin && weightMax) {
					averageWeight = averageWeight / 2;
				} else if (weightMin && !weightMax) {
					weightMax = weightMin;
					averageWeight = weightMin;
				} else if (!weightMin && weightMax) {
					weightMin = weightMax;
					averageWeight = weightMax;
				} else if (inst.name === 'Smooth Fox Terrier') {
					weightMin = 8;
					weightMax = 8;
					averageWeight = (weightMax + weightMin) / 2;
				} else {
					weightMin = 20;
					weightMax = 30;
					averageWeight = (weightMax + weightMin) / 2;
				}

				let dogDetail = {
					id: perrito.id,
					name: perrito.name,
					height: perrito.height.metric,
					life_span: perrito.life_span,
					image: perrito.image ? perrito.image.url : " ",
					temperament: perrito.temperament,
					weightMin: weightMin,
					weightMax: weightMax,
					averageWeight: averageWeight,
				};

				return dogDetail;
			}
		
	} catch (error) {
		return { error: `The dog with id ${id} does not exist` };
	}
};


//Esta funcion creara un nuevo Dog en mi DB con toda la informacionr solicitada. Si no se completa toda la informacion, mostrara un error.
const createNewDog= async ( weightMin, weightMax, height, name, life_span, image, temperament, from_DB)=> {
    if (!weightMin || !weightMax || !height || !name || !life_span || !image || !temperament){
    throw new Error("Missing information. Please, complete all the required data.")
    }
    else{
        let newDog= await Dog.create({
            name: name,
			height: height,
			life_span: life_span,
			image: image,
			weightMin: weightMin,
			weightMax: weightMax,
            averageWeight: (weightMax + weightMin) /2,
        })
        let temper= await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        await newDog.addTemperament(temper);
    }
    // return newDog
};

module.exports= {
    getBreeds,
    getBreedsByName,
    getBreedById,
    createNewDog,
}