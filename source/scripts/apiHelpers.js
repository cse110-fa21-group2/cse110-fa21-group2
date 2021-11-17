// helper functions for Spoonacular API
//all these functions fetch for most popular recipes
//TODO: sort by random, look for easy recipe(maxReadyTime)
//import fetch from 'node-fetch';   //this is so it works on my local node js
require('dotenv').config();
const fetch = require('node-fetch');
const API_KEY = process.env.API_KEY;
const HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

/**
 * Get detailed info from recipe ID's
 * @param {int[]} ids - ids of recipe
 * @returns {dict} detailed info of recipes 
 */
 async function getDetailedRecipeInfoBulk(ids) {
  return new Promise((resolve, reject) => {
    const idsFormatted = ids.join(',');
    fetch(`https://${HOST}/recipes/informationBulk?&ids=${idsFormatted}`,{
      "method": "GET",
	    "headers": {
		    "x-rapidapi-host": HOST,
		    "x-rapidapi-key": API_KEY
      }
    })
      .then(response => {
        resolve(response.json());
      })
      .catch(err => {
        console.log('Error getting detailed recipe info');
        reject(err);
      });
 });
}
/**
 * Helper function to extract recipe ids
 * @param {dict} - dictionary of recipes search results from complex search
 * @returns {int[]} - list of recipe ids
 */
function extractIDs(data){
  let results = data['results'];
  let ids = [];
  results.forEach(result =>{
    ids.push(result['id']);
  });
  return ids;
}



/**
 * Get recipes by keywords(user searching for recipes)
 * @param {int} num - max number of recipes to get
 * @param {string} query - Keywords to search for.
 * @returns {dict} list of recipes with detailed info
 */
async function getRecipesByName(query, num) {
  return new Promise((resolve, reject) => {
    const queryFormatted = query.trim().replace(/\s+/g, '-').toLowerCase();
    fetch(`https://${HOST}/recipes/complexSearch?&query=${queryFormatted}&number=${num}&sort=popularity`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const ids = extractIDs(data);
        resolve(getDetailedRecipeInfoBulk(ids));
      })
      .catch((err) => {
        console.log('Error in searching for recipes by name.');
        reject(err);
      });
  });
}

/**
 * Get recipe by cuisine
 * @param {string} cuisine - any cuisine specified here https://spoonacular.com/food-api/docs#Cuisines)
 * @param {int} num - max number of recipes to get
 * @returns {dict} list of recipes with detailed info
 */
 async function getRecipesByCuisine(cuisine, num){
  return new Promise((resolve, reject) =>{
    fetch(`https://${HOST}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&number=${num}&sort=popularity`,{
      "method": "GET",
      "headers": {
        "x-rapidapi-host": HOST,
        "x-rapidapi-key": API_KEY
      }
    })
      .then(response => response.json())
      .then(data =>{  
        let ids = extractIDs(data);
        resolve(getDetailedRecipeInfoBulk(ids));
      })
      .catch(err => {
        console.log('Error in searching for recipes by cuisine.');
        reject(err);
      });
  });
}

/**
 * Get recipe by type(can use this to grab a bunch of recipes when user first enters site)
 * @param {string} type - type of meal
 * @param num - max number of recipes to get
 * @returns {dict} list of recipes with detailed info
 */
 async function getRecipesByType(type, num){
  return new Promise((resolve, reject) =>{
    fetch(`https://${HOST}/recipes/complexSearch?&type=${type}&number=${num}&sort=popularity`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": HOST,
        "x-rapidapi-key": API_KEY
      }
    })
    .then(response => response.json())
    .then(data =>{  
      let ids = extractIDs(data);
      resolve(getDetailedRecipeInfoBulk(ids));
    })
      .catch(err => {
        console.log('Error in searching for recipes by type.');
        reject(err);
      });
  });
}


// export functions
module.exports({
  API_KEY,
  HOST,
  getRecipesByName,
  getRecipesByType,
  getRecipesByCuisine,
  getDetailedRecipeInfoBulk,
  extractIDs,
});


//let thing = await getAnalyzedInstructions(715569);
//console.log(thing[0]['steps']);


//console.log(getRecipesByType("lunch",3));
//console.log(await getRecipesByCuisine("mexican",2));
console.log(getRecipesByName("potato",2))

