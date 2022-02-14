// helper functions for Spoonacular API

import { getAllRecipes } from './storage/fetcher.js';
// require('dotenv').config();// REQUIRE DOES NOT WORK ON BROWSER HOW TO FIX?
import { API_KEY, HOST, DEV_MODE } from './constants.js';
import TEST_DATA from './storage/sampleData.js';
// import fetch from 'node-fetch';

/**
 * Get detailed info from recipe ID's
 * @param {Object} ids - list of ids of recipes
 * @returns {Array} Array of recipe Objects where each object contains detailed info
 */
export async function getDetailedRecipeInfoBulk(idsToFetch) {
  if (DEV_MODE) return TEST_DATA;
  return new Promise((resolve, reject) => {
    if (idsToFetch.length === 0) {
      resolve([]);
    } else {
      const idsFormatted = idsToFetch.join(',');
      const url = new URL(`https://${HOST}/recipes/informationBulk`);
      url.searchParams.append('ids', idsFormatted);
      url.searchParams.append('includeNutrition', 'true');
      fetch(url.href, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': HOST,
          'x-rapidapi-key': API_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data.map((recipe) => {
            const recipeInfo = recipe;
            const { nutrients } = recipe.nutrition;
            delete recipeInfo.nutrition;
            recipeInfo.nutrients = nutrients;
            return recipeInfo;
          }));
        })
        .catch((err) => {
          console.log('Error getting detailed recipe info');
          reject(err);
        });
    }
  });
}

/**
 * Helper function to extract recipe ids from complex search ONLY.
 * This will grab all recipe ids and return ids not in local storage that
 * need to be fetched and recipes already in local storage.
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
    if (recipeData[id] === undefined) {
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
 * The value is whatever you set to the parameter. Ex (key:value) = (diet:'vegetarian')
 * Options for sort parameter here https://spoonacular.com/food-api/docs#Recipe-Sorting-Options
 * Make sure include (sortDirection: 'asc' or 'desc).
 *
 * It seems like you can only sort by one thing per call,
 * so you can't sort by calories and popularity together(at least I havent figure out how to)
 * @returns {Object} list of recipe JSONs
 */
export async function getRecipesByName(query, num = 5, offset = 0, sortFilterParams = { sort: 'popularity', sortDirection: 'desc' }) {
  if (DEV_MODE) return TEST_DATA;
  return new Promise((resolve, reject) => {
    const url = new URL(`https://${HOST}/recipes/complexSearch`);
    const queryFormatted = query.trim().replace(/\s+/g, '-').toLowerCase();
    url.searchParams.append('query', queryFormatted);
    url.searchParams.append('number', num);
    url.searchParams.append('offset', offset);

    // add sort and filter params to search
    Object.keys(sortFilterParams).forEach((key) => {
      url.searchParams.append(key, sortFilterParams[key]);
    });
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
        if (ids.length === 0) {
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
 * Get recipe by cuisine
 * @param {String} cuisine - any cuisine specified here https://spoonacular.com/food-api/docs#Cuisines
 * @param {Number} [num=5] - max number of recipes to get
 * @param {Number} [offset=0] - number of recipes to skip
 *  (use random number so we dont get same results everytime)
 * @returns {Object} list of recipe JSONs
 */
export async function getRecipesByCuisine(cuisine, num = 5, offset = 0) {
  if (DEV_MODE) return TEST_DATA;
  return new Promise((resolve, reject) => {
    const url = new URL(`https://${HOST}/recipes/complexSearch`);
    url.searchParams.append('cuisine', cuisine);
    url.searchParams.append('number', num);
    url.searchParams.append('offset', offset);
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
        if (ids.length === 0) {
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
  if (DEV_MODE) return TEST_DATA;
  return new Promise((resolve, reject) => {
    const url = new URL(`https://${HOST}/recipes/complexSearch`);
    url.searchParams.append('type', type);
    url.searchParams.append('number', num);
    url.searchParams.append('offset', offset);
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
        if (ids.length === 0) {
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
