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
  console.log("Initializing");
  createRecipeCards();
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
  /*
  let storageCategoryData = fetcherFuncs.getAllCategoryRecipe();
  const categoryNames = ['popular', 'cheap', 'healthy', 'fast'];
  for (let i = 0; i < categoryNames.length; i++) {
    if (!(categoryNames[i] in storageCategoryData)
        || storageCategoryData[categoryNames[i]].length < 10) {
        // fetch from api for (categoryNames[i], 10)
       const fetchedData = [];
       // store to local storage
       storageFuncs.storeRecipeData(categoryNames[i], fetchedData);
    }
  }
  storageCategoryData = fetcherFuncs.getAllCategoryRecipe();
  createExploreRecipeCards(storageCategoryData);
  
  const storageSavedData = fetcherFuncs.getAllSavedRecipe();*/
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
 * Populates index.html with recipecards, as defined in
 * RecipeCard.js
 * @param options a json object to be edited in the future for options
 * ALEX and FRED- Start here.
 * Alex- Edit this into a for loop that populates all the pages and sections. 
 * You might need to edit index.html to make tags more specific.
 * Fred- The recipe card exists, but is entirely unpopulated and thus
 * invisible in the page. You can see it via dev-tools (within div tags in index: 
 * explore/explore-section/recipe-row). We need it to actually populate with the data.
 * You might need to edit RecipeCard.js
 */
function createRecipeCards(options = {}){
  const recipeCard = document.createElement('recipe-card');
  recipeCard.data = {};
  document.querySelector('.recipe-row').appendChild(recipeCard);
}

/**
 * Generates the <recipe-card> elements from fetched recipes and appends them to page
 * @param storageCategoryData a JSON Object {category: RecipeJSON, ...}
 */
function createExploreRecipeCards(storageCategoryData) {

  Object.keys(storageCategoryData).forEach((category) => {
    let recipeCard = document.createElement('recipe-card');
    recipeCard.data = storageCategoryData;
    let page /* = recipeData[recipes[i]]['page-name'] */;
    router.addPage(page, () => {
      // TODO: Replace with our version names
      // document.querySelector('.section--recipe-cards').classList.remove('shown');
      // document.querySelector('.section--recipe-expand').classList.add('shown');
      // document.querySelector('recipe-expand').data = recipeData[recipes[i]];
    })
  })   
}
