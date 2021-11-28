/* eslint-disable no-unused-vars */
// helper functions for Spoonacular API
// all these functions fetch for most popular recipes

// eslint-disable-next-line import/no-unresolved
import { rules } from 'stylelint';
import { getAllRecipes, getSingleRecipe } from './storage/fetcher.js';
// require(['dotenv']).config();// REQUIRE DOES NOT WORK ON BROWSER HOW TO FIX?
// const { API_KEY }= process.env.API_KEY;// prevent exposing api key
const API_KEY = '';
const HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

/**
 * Get detailed info from recipe ID's
 * @param {Object} ids - list of ids of recipes
 * @returns {Array} Array of recipe Objects where each object contains detailed info

 */
export async function getDetailedRecipeInfoBulk(idsToFetch) {
  return new Promise((resolve, reject) => {
    // fetch from API
    if (idsToFetch.length == 0) {
      resolve([]);
    } else {
      const idsFormatted = idsToFetch.join(',');

      fetch(`https://${HOST}/recipes/informationBulk?&ids=${idsFormatted}&includeNutrition=true`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': HOST,
          'x-rapidapi-key': API_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          data.forEach((recipe) => {
            const { nutrients } = recipe.nutrition;
            // eslint-disable-next-line no-param-reassign
            delete recipe.nutrition;
            // eslint-disable-next-line no-param-reassign
            recipe.nutrients = nutrients;
          });
          resolve(data);
        })
        .catch((err) => {
          console.log('Error getting detailed recipe info');
          reject(err);
        });
    }
  });
}

/**
 * Helper function to extract recipe ids from complex search ONLY
 * @param {Object} - list of recipes search results from complex search
 * @returns {Object} - [Recipes IDs to fetch, Recipe JSONs already in local storage]
 */
export function extractIDs(data) {
  const { results } = data;
  if (!results) {
    return [];
  }
  const idsToFetch = [];
  const recipesInLocalStorage = [];
  const recipeData = getAllRecipes();
  results.forEach((result) => {
    const { id } = result;
    if (recipeData[id] == undefined) {
      idsToFetch.push(id);
    } else {
      recipesInLocalStorage.push(recipeData[id]);
    }
  });
  return [idsToFetch, recipesInLocalStorage];
}

/**
 * Get recipes by keywords(user searching for recipes)
 * @param {String} query - Keywords to search for
 * @param {Number} [num=5] - max number of recipes to get
 * @param {Number} [offset=0] - number of recipes to skip
 * @param {Object} [sortFilterParams = {sort:'popularity', sortDirection:'desc'}]
 *                 - dictionary of sort/filter parameters
 * The key is any parameter listed here https://spoonacular.com/food-api/docs#Search-Recipes-Complex
 * The value is whatever you set to the parameter. Ex (key:value) = (diet:'vegitarian')
 * Options for sort parameter here https://spoonacular.com/food-api/docs#Recipe-Sorting-Options
 * Make sure include a sort direction, 'asc' or 'desc'
 * @returns {Object} list of recipe JSONs
 */
// eslint-disable-next-line no-unused-vars
export async function getRecipesByName(query, num = 5, offset = 0, sortFilterParams = { sort: 'popularity', sortDirection: 'desc' }) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://${HOST}/recipes/complexSearch`);
    const queryFormatted = query.trim().replace(/\s+/g, '-').toLowerCase();
    url.searchParams.append('query', queryFormatted);
    url.searchParams.append('num', num);
    url.searchParams.append('offset', offset);

    // add sort and filter params
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, val] of Object.entries(sortFilterParams)) {
      url.searchParams.append(key, val);
    }
    console.log(url.href);
    fetch(url.href, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const ids = extractIDs(data);
        if (ids.length == 0) {
          console.log('No search results');
          resolve([]);
        } else {
          getDetailedRecipeInfoBulk(ids[0])
            .then((fetchedRecipes) => {
              resolve(fetchedRecipes.concat(ids[1]));
            });
        }
      })
      .catch((err) => {
        console.log('Error in searching for recipes by name.');
        reject(err);
      });
  });
}

/**
 * Get recipes by autocompleting keywords
 * (Use this if searching by query returned not enough results)
 * @param {String} query - Query to autocomplete
 * @param {Number} [num=5] - max number of recipes to get
 * @returns {Object} list of recipe JSONs
 */
// eslint-disable-next-line no-unused-vars
export async function getRecipesByAutocomplete(query, num = 5) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://${HOST}/recipes/autocomplete`);
    const queryFormatted = query.trim().replace(/\s+/g, '-').toLowerCase();
    url.searchParams.append('query', queryFormatted);
    url.searchParams.append('number', num);
    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          console.log('No search results');
          resolve([]);
        } else {
          // data is different format from complex search
          const passToExtractID = {};
          passToExtractID.results = data;
          const ids = extractIDs(passToExtractID);
          if (ids.length == 0) {
            console.log('No search results');
            resolve([]);
          } else {
            getDetailedRecipeInfoBulk(ids[0])
              .then((fetchedRecipes) => {
                resolve(fetchedRecipes.concat(ids[1]));
              });
          }
        }
      })
      .catch((err) => {
        console.log('Error in searching for recipes by autocomplete.');
        reject(err);
      });
  });
}

/**
 * Get recipe by cuisine
 * @param {String} cuisine - any cuisine specified here https://spoonacular.com/food-api/docs#Cuisines
 * @param {Number} [num=5] - max number of recipes to get
 * @param {Number} [offset=0] - number of recipes to skip
 *  (use random number so we dont get same results everytime)
 * @returns {Object} list of recipe JSONs
 */
// eslint-disable-next-line no-unused-vars
export async function getRecipesByCuisine(cuisine, num = 5, offset = 0) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://${HOST}/recipes/complexSearch`);
    url.searchParams.append('cuisine', cuisine);
    url.searchParams.append('number', num);
    url.searchParams.append('offset', offset);
    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const ids = extractIDs(data);
        if (ids.length == 0) {
          console.log('No search results');
          resolve([]);
        } else {
          getDetailedRecipeInfoBulk(ids[0])
            .then((fetchedRecipes) => {
              resolve(fetchedRecipes.concat(ids[1]));
            });
        }
      })
      .catch((err) => {
        console.log('Error in searching for recipes by cuisine.');
        reject(err);
      });
  });
}

/**
 * Get recipe by type(can use this to grab a bunch of recipes when user first enters site)
 * @param {String} type - type of meal
 * @param {Number} [num=5] - max number of recipes to get
 * @param {Number} [offset=0] - number of recipes to skip
 *  (use random number so we dont get same results everytime)
 * @returns {Object} list of recipe JSONs
 */
export async function getRecipesByType(type, num = 5, offset = 0) {
  return new Promise((resolve, reject) => {
    const url = new URL(`https://${HOST}/recipes/complexSearch`);
    url.searchParams.append('type', type);
    url.searchParams.append('number', num);
    url.searchParams.append('offset', offset);
    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': HOST,
        'x-rapidapi-key': API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const ids = extractIDs(data);
        if (ids.length == 0) {
          console.log('No search results');
          resolve([]);
        } else {
          getDetailedRecipeInfoBulk(ids[0])
            .then((fetchedRecipes) => {
              resolve(fetchedRecipes.concat(ids[1]));
            });
        }
      })
      .catch((err) => {
        console.log('Error in searching for recipes by type.');
        reject(err);
      });
  });
}
