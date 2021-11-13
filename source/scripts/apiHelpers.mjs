//helper functions for Spoonacular API
import fetch from "node-fetch";
const API_KEY = 'd780fb789d0440ac90b3330628c2e117';
const URL = 'https://api.spoonacular.com/recipes/';
/**
 * Get recipes by keywords
 * @param {int} num - max number of recipes to get
 * @param {string} query - Keywords to search for.
 * @returns {dict} list of recipes 
 */
async function getRecipesByName(query,num){
  return new Promise((resolve, reject) =>{
    let queryFormatted = query.trim().replace(/\s+/g, '-').toLowerCase();
    fetch(`${URL}complexSearch?apiKey=${API_KEY}&query=${queryFormatted}&number=${num}&sort=popularity`) //TODO:sort by popularity?
      .then(response => response.json())
      .then(data =>{  
        let ids = extractIDs(data);
        resolve(getDetailedRecipeInfoBulk(ids));
      })
      .catch(err => {
        console.log("Error in searching for recipes by name.");
        reject(err);
      });
  });
}

/**
 * Get recipe by cuisine
 * @param {string} cuisine - any cuisine specified here https://spoonacular.com/food-api/docs#Cuisines)
 * @param {int} num - max number of recipes to get
 * @returns {dict} list of recipes 
 */
 async function getRecipesByCuisine(cuisine, num){
  return new Promise((resolve, reject) =>{
    fetch(`${URL}complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&number=${num}&sort=popularity`)
      .then(response => response.json())
      .then(data =>{  
        let ids = extractIDs(data);
        resolve(getDetailedRecipeInfoBulk(ids));
      })
      .catch(err => {
        console.log("Error in searching for recipes by cuisine.");
        reject(err);
      });
  });
}

/**
 * Get recipe by type
 * @param {string} type - type of meal (can only use types specified here https://spoonacular.com/food-api/docs#Meal-Types)
 * @param num - max number of recipes to get
 * @returns {dict} list of recipes
 */
 async function getRecipesByType(type, num){
  return new Promise((resolve, reject) =>{
    fetch(`${URL}complexSearch?apiKey=${API_KEY}&type=${type}&number=${num}&sort=popularity`)
    .then(response => response.json())
    .then(data =>{  
      let ids = extractIDs(data);
      resolve(getDetailedRecipeInfoBulk(ids));
    })
      .catch(err => {
        console.log("Error in searching for recipes by type.");
        reject(err);
      });
  });
}


/**
 * Get detailed info from recipe ID's
 * @param {int[]} ids - ids of recipe
 * @returns {dict} detailed info of recipes 
 */
async function getDetailedRecipeInfoBulk(ids){
  return new Promise((resolve, reject) => {
    let idsFormatted = ids.join(',');
    fetch(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${idsFormatted}`)
      .then(response => {
        resolve(response.json());
      })
      .catch(err => {
        console.log(`Error getting detailed recipe info`);
        reject(err);
      });
 });
}

/**
 * Helper function to extract recipe ids
 * @param {dict} - dictionary of search data
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


//console.log(await getRandomRecipes(3));




