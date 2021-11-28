/* eslint-disable no-plusplus */
// main.js

// Import requried modules
import Router from './Router.js';
import * as storageFuncs from './storage/storage.js';
import * as fetcherFuncs from './storage/fetcher.js';
import * as apiFuncs from './apiHelpers.js';

//TODO Remove this tester later
import {returnDummyData} from "../demo-code/exampleData.js"

// Variable declarations
let router;
let landingPage;
let explorePage;
let savedRecipePage;
let searchResults;
let recipeInfoPage;

async function init() {
  console.log("Initializing");
  const tempData = returnDummyData();
  populateRecipeData(tempData);
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
  // TODO- Fix or remove
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
 * Fred- The recipe card exists, but is not populated with information.
 * We need it to actually populate with the data.
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

function populateRecipeData(data){
  //Get single recipe JSON from list of JSONs
  let curRecipe = data[0]; 

  //Poulate the title of the recipe
  const title = document.querySelector("p.title");
  title.innerHTML = curRecipe.title;

  //Populate the score/rating of the recipe
  let rating = document.querySelector('.rating-stars');
  rating.innerHTML = curRecipe.spoonacularScore / 20 + ' stars';

  //Populate the number of reviews given for the recipe
  let reviews = document.querySelector('.rating-reviews');
  reviews.innerHTML = '**DUMMY REVIEW COUNT**'

  //Populate the recipe description
  const description = document.querySelector('p.description');
  description.innerHTML = curRecipe.summary;

  //Populate the time to make the recipe in minutes
  let totalTime = document.querySelector('.total-time');
  totalTime.innerHTML += curRecipe.readyInMinutes + ' minutes';

  //Populate the serving size of the recipe
  let numServings = document.querySelector('.servings');
  numServings.innerHTML += curRecipe.servings + ' servings';

  /**
   * populate the ingredients to make the recipe
   */
  let ingredList = document.querySelector('.ingredients');
  const recipeIngred = getRecipeIngredients(curRecipe);
  for(let i = 0; i < recipeIngred.length; i++){
    let elem = document.createElement('li');
    elem.innerHTML = recipeIngred[i];
    ingredList.appendChild(elem);
  }

  /**
   * populate the steps to make the recipe
   */
  let stepsList = document.querySelector('.steps');
  const recipeSteps = getRecipeSteps(curRecipe);
  for(let i = 0; i < recipeSteps.length; i++){
    let elem = document.createElement('li');
    elem.innerHTML = recipeSteps[i];
    stepsList.appendChild(elem);
  }

  //Populate video for recipe (if available)
  let video = document.querySelector('.videos-wrapper')
  //TODO: extract video from data if present

  //Populate the nutrition info of the recipe
  let nutFacts = document.querySelectorAll('.nutrition-wrapper > p')[1];
  //TODO: extract nutrition facts from data  
  nutFacts.innerHTML = "**DUMMY NUTRITION FACTS**";
  
}

/**
 * Serving size button functionality
 * not functional yet
 *
let plusButton = document.querySelector('.minus-btn');
plusButton.onclick = scaleRecipeDown(curRecipe);

let minusButton = document.querySelector('.plus-btn');
minusButton.onclick = scaleRecipeUp(curRecipe);
*/

function scaleRecipeUp(recipe){
  let servingSize = document.querySelector('.serving-size');
  servingSize.innerHTML = parseInt(servingSize.innerHTML) + 1;
}

function scaleRecipeDown(recipe){
  let servingSize = document.querySelector('.serving-size');
  if(servingSize.innerHTML <= 1){
    return;
  }
  servingSize.innerHTML = parseInt(servingSize.innerHTML) - 1;
}

/**
 * 
 * @param {*} recipe 
 * @returns stepsList: list of steps to make recipe
 */
function getRecipeSteps(recipe){
  let stepsList = [];
  let steps = recipe.analyzedInstructions[0].steps;
  for(let i = 0; i < steps.length; i++){
    stepsList.push(steps[i].step);
  }
  return stepsList;
}

/**
 * 
 * @param {*} recipe 
 * @returns ingredientList: list of ingredients to make recipe
 */
function getRecipeIngredients(recipe){
  let ingredientList = []
  let ingredients = recipe.extendedIngredients
  for(let i = 0; i < ingredients.length; i++){
    ingredientList.push(ingredients[i].originalString);
  }
  return ingredientList;
}