/* eslint-disable no-unused-vars */
// helper functions for Spoonacular API
// all these functions fetch for most popular recipes
// TODO: sort by random?, look for easy recipe(maxReadyTime)?

// eslint-disable-next-line import/no-unresolved
import { getAllRecipes, getSingleRecipe } from './storage/fetcher.js';
// require('dotenv').config();

// const fetch = require('node-fetch');// uncomment if using with nodejs
// const { API_KEY } = process.env;// prevent exposing api key
// const API_KEY = 'blahblahblah'

const HOST = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

/**
 * Get detailed info from recipe ID's
 * @param {Object} idsToFetch - list of recipe ID's to fetch from API
 * @returns {Object} list of detailed info of recipes
 */
export async function getDetailedRecipeInfoBulk(idsToFetch) {
  return new Promise((resolve, reject) => {
    // fetch from API
    if (idsToFetch.length == 0) {
      resolve([]);
    } else {
      const idsFormatted = idsToFetch.join(',');
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
    }
  });
}

/**
 * Helper function to extract recipe ids from complex search
 * @param {Object} - list of recipes search results from complex search
 * @returns {Object} - [Recipes IDs to fetch, Recipe ids already in local storage]
 */
export function extractIDs(data) {
  const { results } = data;
  if (!results) {
    return [];
  }
  const idsToFetch = [];
  const idsInLocalStorage = [];
  const recipeData = getAllRecipes();
  results.forEach((result) => {
    const { id } = result;
    if (recipeData[id] == undefined) {
      idsToFetch.push(id);
    } else {
      idsInLocalStorage.push(id);
    }
  });
  return [idsToFetch, idsInLocalStorage];
}

/**
 * Get recipes by keywords(user searching for recipes)
 * @param {String} query - Keywords to search for
 * @param {Number} [num=5] - max number of recipes to get
 * @param {Number} [offset=0] - number of recipes to skip
 *  (use random number so we dont get same results everytime)
 * @returns {Object} [list of feteched recipes, ids of recipes in LocalStorage]
 */
// eslint-disable-next-line no-unused-vars
export async function getRecipesByName(query, num = 5, offset = 0) {
  return new Promise((resolve, reject) => {
    const queryFormatted = query.trim().replace(/\s+/g, '-').toLowerCase();
    fetch(`https://${HOST}/recipes/complexSearch?&query=${queryFormatted}&number=${num}&sort=popularity&offset=${offset}`, {
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
          resolve([[], []]);
        } else {
          getDetailedRecipeInfoBulk(ids[0])
            .then((fetchedRecipes) => {
              resolve([fetchedRecipes, ids[1]]);
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
 * @returns {Object} [list of feteched recipes, ids of recipes in LocalStorage]
 */
// eslint-disable-next-line no-unused-vars
export async function getRecipesByAutocomplete(query, num = 5) {
  return new Promise((resolve, reject) => {
    const queryFormatted = query.trim().replace(/\s+/g, '-').toLowerCase();
    fetch(`https://${HOST}/recipes/autocomplete?query=${queryFormatted}&number=${num}`, {
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
          resolve([[], []]);
        } else {
          // data is different format from complex search
          const idsToFetch = [];
          const idsInLocalStorage = [];
          data.forEach((result) => {
            const { id } = result;
            if (localStorage.getItem('recipeData')[id]) {
              idsToFetch.push(id);
            } else {
              idsInLocalStorage.push(id);
            }
          });
          getDetailedRecipeInfoBulk(idsToFetch)
            .then((fetchedRecipes) => {
              resolve([fetchedRecipes, idsInLocalStorage]);
            });
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
 * @returns {Object} [list of feteched recipes, ids of recipes in LocalStorage]
 */
// eslint-disable-next-line no-unused-vars
export async function getRecipesByCuisine(cuisine, num = 5, offset = 0) {
  return new Promise((resolve, reject) => {
    fetch(`https://${HOST}/recipes/complexSearch?cuisine=${cuisine}&number=${num}&sort=popularity&offset=${offset}`, {
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
          resolve([[], []]);
        } else {
          getDetailedRecipeInfoBulk(ids[0])
            .then((fetchedRecipes) => {
              resolve([fetchedRecipes, ids[1]]);
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
 * @returns {Object} [list of feteched recipes, ids of recipes in LocalStorage]
 */
export async function getRecipesByType(type, num = 5, offset = 0) {
  return new Promise((resolve, reject) => {
    fetch(`https://${HOST}/recipes/complexSearch?&type=${type}&number=${num}&sort=popularity&offset=${offset}`, {
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
          resolve([[], []]);
        } else {
          getDetailedRecipeInfoBulk(ids[0])
            .then((fetchedRecipes) => {
              resolve([fetchedRecipes, ids[1]]);
            });
        }
      })
      .catch((err) => {
        console.log('Error in searching for recipes by type.');
        reject(err);
      });
  });
}

/*
getRecipesByAutocomplete("chi", 3)
  .then((data) => {
    console.log(data)
  });

getRecipesByName('asian', 2)
  .then((data) => {
    console.log(data);
  });
*/
