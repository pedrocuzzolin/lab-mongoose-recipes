const { uniqueID, type } = require('mocha/lib/utils');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  level: {
    type: String,
    enum:  ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    required: true
  },
  ingredients: {
    type: [String],
    required: true  
    
  },

  cousine : {
    type: String,
    enum: ['breakfast', 'main_course', 'soup', 'snack', 'drink', 'dessert', 'other']
  },
  dishType : {
    type: String,
    required: true
  },
  image : {
    type: [String], 
    default: ["https://images.media-allrecipes.com/images/75131.jpg"],
    
  },
  duration : {    
    type: Number,
    min:[0, "duration must be greater than 0"],
    required: true
  },  
  creator: {
    type: String,
   
  },
  created: {
    type:  Date,
    default: Date.now,


  },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
