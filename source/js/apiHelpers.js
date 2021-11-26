/* eslint-disable no-unused-vars */
// helper functions for Spoonacular API
// all these functions fetch for most popular recipes
// TODO: sort by random?, look for easy recipe(maxReadyTime)?

// eslint-disable-next-line import/no-unresolved
//require('dotenv').config();
// const fetch = require('node-fetch');// uncomment if using with nodejs
const { API_KEY } = "";// TODO put in api key
const HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

/**
 * Get detailed info from recipe ID's
 * @param {Object} ids - list of ids of recipes
 * @returns {Array} Array of recipe Objects where each object contains detailed info
 */
async function getDetailedRecipeInfoBulk(ids) {
  return new Promise((resolve, reject) => {
    const idsFormatted = ids.join(',');
    fetch(`https://${HOST}/recipes/informationBulk?&ids=${idsFormatted}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((response) => {
        resolve(response.json());
      })
      .catch((err) => {
        console.log('Error getting detailed recipe info');
        reject(err);
      });
  });
}
/**
 * Helper function to extract recipe ids
 * @param {Object} - list of recipes search results from complex search
 * @returns {Object} - list of recipe ids
 */
function extractIDs(data) {
  const { results } = data;
  const ids = [];
  results.forEach((result) => {
    ids.push(result.id);
  });
  return ids;
}

/**
 * Get recipes by keywords(user searching for recipes)
 * @param {Number} num - max number of recipes to get
 * @param {String} query - Keywords to search for
 * @returns {Object} list of recipes with detailed info
 */
// eslint-disable-next-line no-unused-vars
async function getRecipesByName(query, num) {
  return new Promise((resolve, reject) => {
    const queryFormatted = query.trim().replace(/\s+/g, '-').toLowerCase();
    fetch(`https://${HOST}/recipes/complexSearch?&query=${queryFormatted}&number=${num}&sort=populatrity`, {
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
 * @param {String} cuisine - any cuisine specified here https://spoonacular.com/food-api/docs#Cuisines
 * @param {Number} num - max number of recipes to get
 * @returns {Object} list of recipes with detailed info
 */
// eslint-disable-next-line no-unused-vars
async function getRecipesByCuisine(cuisine, num) {
  return new Promise((resolve, reject) => {
    fetch(`https://${HOST}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&number=${num}&sort=popularity`, {
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
        console.log('Error in searching for recipes by cuisine.');
        reject(err);
      });
  });
}

/**
 * Get recipe by type(can use this to grab a bunch of recipes when user first enters site)
 * @param {String} type - type of meal i.e. breakfast, lunch, dinner
 * @param {Number} num - max number of recipes to get
 * @returns {Object} list of recipes with detailed info
 */
export async function getRecipesByType(type, num) {
  return new Promise((resolve, reject) => {
    fetch(`https://${HOST}/recipes/complexSearch?&type=${type}&number=${num}&sort=popularity`, {
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
        console.log('Error in searching for recipes by type.');
        reject(err);
      });
  });
}

// export functions and API and HOST variables
// not sure how to do this


/**
 * Get recipe by cuisine
 * @param {String} cuisine - any cuisine specified here https://spoonacular.com/food-api/docs#Cuisines
 * @param {Number} num - max number of recipes to get
 * @param {String} sort - any Recipe Sorting Options here https://spoonacular.com/food-api/docs#Recipe-Sorting-Options
 * @returns {Object} list of recipes with detailed info
 */
// eslint-disable-next-line no-unused-vars
// async function getRecipesByCuisine(cuisine, num, sort) {
//   return new Promise((resolve, reject) => {
//     fetch(`https://${HOST}/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cuisine}&number=${num}&sort=${sort}`, {
//       method: 'GET',
//       headers: {
//         'x-rapidapi-host': HOST,
//         'x-rapidapi-key': API_KEY,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const ids = extractIDs(data);
//         resolve(getDetailedRecipeInfoBulk(ids));
//       })
//       .catch((err) => {
//         console.log('Error in searching for recipes by cuisine.');
//         reject(err);
//       });
//   });
// }
