/* eslint-disable no-plusplus */
// main.js

// Import requried modules
import Router from './Router.js';
import * as storageFuncs from './storage/storage.js';
import * as fetcherFuncs from './storage/fetcher.js';
import * as apiFuncs from './apiHelpers.js';

// Variable declarations
let router;
let landingPage;
let explorePage;
let savedRecipePage;
let searchResults;
let recipeInfoPage;

async function init() {
  console.log('Initializing');

  // const objDummyData = {
  //   category1: {name: "fried rice", calories: "too many"},
  //   category2: {name: "ramen", calories: "idk prob 500"},
  // };

  // TODO
  // Load 10 recipes per category for explore page (offset=rand to get diff recipe everytime)
  // Populate explore page cards
  // add recipes to localstorage
  // navigate to explore page

  // fetch saved recipe cards from localstorage
  // navigate to saved recipe page
  // add save button action to every card and page to update the saved recipe page so we don't
  // have to handle it when we open the page

  // add event handler to search button to fetch recipes for query
  // add recipes to localstorage
  // populate search result cards
  // navigate to search results page

  landingPage = document.querySelector('.landing');
  explorePage = document.querySelector('.explore');
  savedRecipePage = document.querySelector('.saved-recipes');
  searchResults = document.querySelector('.search-results');
  recipeInfoPage = document.querySelector('.recipe-info');

  router = new Router(() => {
    landingPage.classList.remove('hidden');
    explorePage.classList.add('hidden');
    savedRecipePage.classList.add('hidden');
    searchResults.classList.add('hidden');
    recipeInfoPage.classList.add('hidden');
  });

  // Function calls
  // Fetch recipes and store locally if storage is empty.

  // let storageCategoryData = fetcherFuncs.getAllCategoryRecipe();
  // const categoryNames = ['breakfast'];
  // for (let i = 0; i < categoryNames.length; i++) {
  //   if (storageCategoryData === null
  //       || !(categoryNames[i] in storageCategoryData)
  //       || storageCategoryData[categoryNames[i]].length < 10) {
  //       // fetch from api for (categoryNames[i], 10)

  //     const fetchedData = apiFuncs.getRecipesByType(categoryNames[i], 10);
  //     // store to local storage
  //     storageFuncs.storeRecipeData(categoryNames[i], fetchedData);
  //   }
  // }
  // storageCategoryData = fetcherFuncs.getAllCategoryRecipe();

  // storageSavedData = fetcherFuncs.getAllSavedRecipe();

  // Testing variables
  const testArrRecipe = [
    { id: 1337, title: 'Doritos and Mtn Dew' },
    { id: 1911, title: 'Pizza' },
  ];
  storageFuncs.storeRecipeData('test', testArrRecipe);
  const testLocation = document.querySelector('#trending~div');

  createRecipeCards(['1337', '1911'], testLocation, 2);
}
window.addEventListener('DOMContentLoaded', init);

/**
 *
 * @param {Element} rec the recipe to prepare for clicking
 * @param {String} recPageName the name of page for that recipe
 */
// eslint-disable-next-line no-unused-vars
function prepRecipeForClick(rec, recPageName) {
  rec.addEventListener('click', () => {
    Router.navigate(recPageName, false);
  });
}

/**
 * Populates index.html with <recipe-card> elements, as defined in
 * RecipeCard.js. This function is meant to be called for each section that needs
 * to be populated with recipe cards.
 * @param arrData an array of recipe ids (currently). example input:
 * [
*    "123", // recipe id
*    "111", // recipe id
*    "444", // recipe id
*  ]
 * @param location specifies where recipes are being filled i.e. HTML tags
 * @param numRecipesPopd how many recipes are being populated (used with fetcherFuncs)
 * ALEX and FRED- Start here.
 * Alex- Edit this into a for loop that populates all the pages and sections.
 * You might need to edit index.html to make tags more specific.
 * Fred- The recipe card exists, but is not populated with information.
 * We need it to actually populate with the data.
 * You might need to edit RecipeCard.js
 */
function createRecipeCards(arrData, location, numRecipesPopd = 5) {
  // Populate each section
  let i = 0;
  // Checks to make sure only populate as many as requested by numRecipesPopd or
  // until reach the end of the array of recipe ids i.e. ran out of recipes
  while (i < numRecipesPopd && i < arrData.length) {
    const recipeCard = document.createElement('recipe-card');
    // work-in-progress by Fred for populating recipe cards.
    recipeCard.data = fetcherFuncs.getSingleRecipe(parseInt(arrData[i]));
    location.appendChild(recipeCard);
    i++;
  }
}
