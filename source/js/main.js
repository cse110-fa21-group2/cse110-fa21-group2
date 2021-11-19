/* eslint-disable no-plusplus */
// main.js

// Import requried modules
import Router from './Router';
import * as storageFuncs from './storage/storage';
import * as fetcherFuncs from './storage/fetcher';
import * as apiFuncs from './apiHelpers';

// Variable declarations
let router;
let landingPage;
let explorePage;
let savedRecipePage;
let searchResults;
let recipeInfoPage;

async function init() {
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
  
  const storageSavedData = fetcherFuncs.getAllSavedRecipe();
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
 * Generates the <recipe-card> elements from fetched recipes and appends them to page
 * @param storageCategoryData a JSON Object
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
