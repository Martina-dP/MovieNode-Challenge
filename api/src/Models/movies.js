const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const moviesSchema = new Schema({
    
    title: {type : String}, 
    year: {type : Number},
    released: {type : String},
    genre: {type : [String]},
    director: {type : String},
    actors: {type : [String]},
    plot: {type : String},
    ratings: { type: Number, min: 0, max: 10 }

});

module.exports = mongoose.model('Pelicula', moviesSchema);