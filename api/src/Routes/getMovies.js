const { Router } = require("express");
const Pelicula = require("../Models/movies");
const axios = require("axios")

const router = Router();

router.get("/", async function( req, res) {
    
    //traigo todas las peliculas de la base de datos
    const lista = await Pelicula.find();
      res.json(lista);

});

router.get("/:title", async function( req, res) {
    const { title } = req.params;
    
    //traigo toda la iformacion de la pelicula
    const datosApi = (await axios.get(`https://www.omdbapi.com/?t=${title}&apikey=99a02b`)).data
    
    //valido si la pelicula existe
    if (datosApi.Response === "True") {

        const filterPelicula = await Pelicula.findOne({ title: `${datosApi.Title}`});
        
        if(filterPelicula){
            res.send('Esta pelicula ya existe');
        } else {
        //selecciono los datos que quiero de la api
            const lista = {} 
            lista.title = datosApi.Title
            lista.year = datosApi.Year
            lista.director = datosApi.Director
            lista.actors = datosApi.Actors
            lista.plot = datosApi.Plot
            lista.genre = datosApi.Genre
            lista.released = datosApi.Released
            //guardo la informacion en la base de datos
            const newPelicula= await new Pelicula(lista);
            await newPelicula.save();
            res.json(newPelicula)
        }
    } else {
        res.send('No existe la pelicula')
    }
});
    
router.delete("/:title", async function( req, res) {
    const { title } = req.params;
    //elimino pelicula de la base de datos
    const deleted = await Pelicula.deleteOne({ title: `${title}` });
    return deleted ? res.json("pelicula borrada") : null;
});

module.exports = router;