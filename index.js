const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import the Recipe model
const recipes = require('./data.json'); // Ensure data.json is correctly imported and available

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app'; // MongoDB URI

// Connect to the database
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Remove all existing recipes
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log('All existing recipes have been removed.');
    // Insert multiple recipes from the dataset
    return Recipe.insertMany(recipes);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => console.log(`Recipe inserted: ${recipe.title}`));
    // Create a new specific recipe
    return Recipe.create({
      title: 'Thai Style Chicken Noodle Soup',
      level: 'Amateur Chef',
      ingredients: ['Chicken', 'Noodles', 'Coconut milk', 'Curry paste', 'Vegetables'],
      cuisine: 'Thai',
      dishType: 'soup',
      duration: 45,
      creator: 'Chef John',
    });
  })
  .then((newRecipe) => {
    console.log(`Recipe created: ${newRecipe.title}`);
    // Update the duration of the Rigatoni alla Genovese recipe
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then((updatedRecipe) => {
    console.log(`Recipe updated successfully: ${updatedRecipe.title}`);
    // Remove the Carrot Cake recipe
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Recipe removed successfully');
  })
  .finally(() => {
    // Close the database connection
    mongoose.connection.close(() => {
      console.log('Database connection closed');
    });
  })
  .catch((error) => {
    console.error('Error during the database operations:', error);
    mongoose.connection.close();
  });
