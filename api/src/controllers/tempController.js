//En este archivo cree el Controller que usaré en mi temper handler.
//Este archivo es el controlara la logica de mi Temperament route.

const axios= require ("axios");

//Importo el model de Temperament.

const {Temperament} = require ("../db")

//Esta funcion debe hacer todo lo siguiente:
//*Traer data desde la Api
//*seleccionar dos veces la .data desde la informacion y map obtenidos: 1) para ver si en cada instacia dentro del atributo de Temperametn existe algo. Si hay, debe guardarlo, si no hay envia un string: "No info".
//*2) Para ver todos los elementos y dividirlos con una coma para tener un Array de muchos Strings separados.
//Elimina todas las palabras repetidas del array y guarda todos los strings como arrays.
//*Finalmente trae toda la infomacion guardada en mi DB.


const gettingAlltempsfromApi = async()=>{
    const allData = await axios.get(
        "https://api.thedogapi.com/v1/breeds"
);
    try {
    let everyTemperament = allData.data
    .map((dog) => (dog.temperament ? dog.temperament : "No info"))
    .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach((el) => {
    if (el) {
        Temperament.findOrCreate({
        where: { name: el },
        });
    }
    });
    eachTemperament = await Temperament.findAll({attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] }
});
    return eachTemperament;
} catch (error) {
    throw new Error(error = error.message);
}
}

module.exports= {gettingAlltempsfromApi};