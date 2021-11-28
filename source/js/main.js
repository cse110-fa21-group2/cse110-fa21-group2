/* eslint-disable import/extensions */
// Import requried modules
import Router from './Router.js';
import * as storageFuncs from './storage/storage.js';
import * as fetcherFuncs from './storage/fetcher.js';
import * as apiFuncs from './apiHelpers.js';

// Constant variables (reduce magic numbers)
const DEFAULT_NUM_CARDS = 10;

const sections = [
  'landing',
  'explore',
  'saved-recipes',
  'search-results',
  'recipe-info',
  'create-recipe-page',
];

/** We switch pages by making a section visible and hiding all others */
const openSection = (active) => () => {
  sections.forEach(((val) => {
    const section = document.querySelector(`.${val}`);
    if (val === active) {
      section.classList.remove('hidden');
    } else {
      section.classList.add('hidden');
    }
  }));
};

/**
 * helper function to remove duplication
 * @returns search bar input
 */
const getSearchQuery = () => document.querySelector('.form-control').value;

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
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
 */
function createRecipeCards(arrData, location, numRecipesPopd = 5) {
  // Populate each section
  let i = 0;
  // Checks to make sure only populate as many as requested by numRecipesPopd or
  // until reach the end of the array of recipe ids i.e. ran out of recipes
  while (i < numRecipesPopd && i < arrData.length) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.id = arrData[i];
    // work-in-progress by Fred for populating recipe cards.
    recipeCard.data = fetcherFuncs.getSingleRecipe(parseInt(arrData[i], 10));
    location.appendChild(recipeCard);
    i += 1;
  }
}

const router = new Router();

/* Navbar button handlers */

const openHome = () => {
  router.navigate('landing', false);
};

const openExplore = () => {
  router.navigate('explore', false);
};

const openSavedRecipes = () => {
  router.navigate('saved-recipes', false);
};

const openCreateRecipe = () => {
  router.navigate('create-recipe-page', false);
};

const openSearchResults = async () => {
  // TODO: Fetch search results from API call and populate cards before navigation
  const query = getSearchQuery();
  const numOfRecipe = 4;
  const pageOffset = 0;
  const searchResultPageTitle = document.getElementById('search-results-title');
  searchResultPageTitle.innerHTML = `Top recipes for "${query}"`;
  const searchResult = await apiFuncs.getRecipesByName(query, numOfRecipe, pageOffset);
  storageFuncs.storeRecipeData(query, searchResult);

  const resultRecipeId = JSON.parse(localStorage.getItem('categories'))[query];
  const searchResultsContainer = document.getElementById('search-results-container');
  removeAllChildNodes(searchResultsContainer);
  createRecipeCards(resultRecipeId, searchResultsContainer, numOfRecipe);

  router.navigate('search-results', false);
};

const openRecipeInfo = (data) => {
  // TODO: Populate page from data
  router.navigate('recipe-info', false);
};

function initializeRoutes() {
  sections.forEach((section) => router.addPage(section, openSection(section)));

  document.getElementById('landing-nav').addEventListener('click', openHome);
  document.getElementById('explore-nav').addEventListener('click', openExplore);
  document.getElementById('saved-recipes-nav').addEventListener('click', openSavedRecipes);
  document.getElementById('create-recipe-nav').addEventListener('click', openCreateRecipe);
  document.getElementById('search-results-nav').addEventListener('click', openSearchResults);
}

/* Back button event handler */
function bindPopState() {
  window.addEventListener('popstate', (e) => {
    const { state } = e;
    router.navigate(state ? state.page : 'landing', true);
  });
}

function populateExplore() {
  // TODO: Fetch cards and add to explore section
  const exploreSections = document.querySelectorAll('.explore-section .recipe-row');

  // PRE-API IMPLEMENTATION | COMMENT/DELETE ONCE LOCALSTORAGE POPULATED BY API
  const breakfastArrRecipe = [
    { id: 1348, title: 'Spicy Sausage Scramble' },
    { id: 1204, title: 'Chick\'n Waffles' },
  ];
  storageFuncs.storeRecipeData('breakfast', breakfastArrRecipe);

  const lunchArrRecipe = [
    { id: 5109, title: 'Grilled Cheese' },
    { id: 1598, title: 'Korean Fried Chicken' },
  ];
  storageFuncs.storeRecipeData('lunch', lunchArrRecipe);

  const dinnerArrRecipe = [
    { id: 5981, title: 'Lasagna' },
    { id: 1409, title: 'Pad Thai' },
  ];
  storageFuncs.storeRecipeData('dinner', dinnerArrRecipe);

  const trendingArrRecipe = [
    { id: 1987, title: 'Tonkatsu Ramen' },
    { id: 1095, title: 'Red Braised Pork Belly' },
  ];
  storageFuncs.storeRecipeData('trending', trendingArrRecipe);
  // ********* //

  // Get IDs from localStorage using fetcher functions
  const allCategoriesIds = fetcherFuncs.getAllCategoryRecipeId();

  // Iterate through each category in explore IDs and add recipe cards using their IDs
  exploreSections.forEach((section) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const category in allCategoriesIds) {
      if (section.id === category) {
        createRecipeCards(allCategoriesIds[category], section, DEFAULT_NUM_CARDS);
      }
    }
  });
}

function populateSavedRecipes() {
  // PRE-API IMPLEMENTATION | COMMENT/DELETE ONCE LOCALSTORAGE POPULATED BY API
  storageFuncs.createList('favorites');
  storageFuncs.saveRecipeToList('favorites', 1987);
  storageFuncs.saveRecipeToList('favorites', 5981);
  // ******* //

  // Location where recipe cards are to be added
  const grid = document.querySelector('.saved-recipes .results-grid');

  // Get IDs from localStorage using fetcher functions
  const allSavedIds = fetcherFuncs.getAllSavedRecipeId();

  // Iterate through each "list" in saved lists and add recipe cards using their IDs
  Object.keys(allSavedIds).forEach((category) => {
    // TODO: Only populate cards for the active category
    createRecipeCards(allSavedIds[category], grid, DEFAULT_NUM_CARDS);
  });
}

// TODO: In recipe card and expanded page, when we toggle save recipe, update page in the background

/* More event handlers */

const addIngredientClicked = () => {
  const createIngRoot = document.querySelector('.ingredient-input-list');

  const ingRow = document.createElement('div');
  ingRow.setAttribute('class', 'row create-ingredient-fact');

  const ingAmountDiv = document.createElement('div');
  ingAmountDiv.setAttribute('class', 'col');
  const ingAmountInput = document.createElement('input');
  ingAmountInput.setAttribute('type', 'number');
  ingAmountInput.setAttribute(
    'class',
    'form-control recipe-ingredient-amount',
  );
  ingAmountInput.setAttribute('placeholder', 'Amount');
  ingAmountDiv.appendChild(ingAmountInput);

  const ingUnitDiv = document.createElement('div');
  ingUnitDiv.setAttribute('class', 'col');
  const ingUnitInput = document.createElement('input');
  ingUnitInput.setAttribute('type', 'text');
  ingUnitInput.setAttribute('class', 'form-control recipe-ingredient-unit');
  ingUnitInput.setAttribute('placeholder', 'Unit');
  ingUnitDiv.appendChild(ingUnitInput);

  const ingNameDiv = document.createElement('div');
  ingNameDiv.setAttribute('class', 'col');
  const ingNameInput = document.createElement('input');
  ingNameInput.setAttribute('type', 'text');
  ingNameInput.setAttribute('class', 'form-control recipe-ingredient-name');
  ingNameInput.setAttribute('placeholder', 'Name');
  ingNameDiv.appendChild(ingNameInput);

  ingRow.appendChild(ingNameDiv);
  ingRow.appendChild(ingAmountDiv);
  ingRow.appendChild(ingUnitDiv);

  createIngRoot.appendChild(ingRow);
};

const addStepClicked = () => {
  const createStepRoot = document.querySelector('.step-input-list');
  const allStepInput = document.querySelectorAll('.recipe-step-input');
  const stepInput = document.createElement('input');
  stepInput.setAttribute('type', 'text');
  stepInput.setAttribute('class', 'form-control recipe-step-input');
  stepInput.setAttribute('id', `step-${allStepInput.length}`);
  stepInput.setAttribute('placeholder', `Step ${allStepInput.length + 1}`);
  createStepRoot.appendChild(stepInput);
};

const createRecipeClicked = () => {
  const ingredientAmount = document.querySelectorAll(
    '.recipe-ingredient-amount',
  );

  const ingredientUnits = document.querySelectorAll(
    '.recipe-ingredient-unit',
  );

  const ingredientNames = document.querySelectorAll(
    '.recipe-ingredient-name',
  );

  const steps = document.querySelectorAll('.recipe-step-input');

  const finalObject = {};

  // format serving
  const serving = document.querySelector(
    '.ingredient-serving-input',
  );
  finalObject.servings = serving.value;

  // format all the ingredients:
  const ingredientArray = [];
  for (let i = 0; i < ingredientNames.length; i += 1) {
    const ingObject = {};
    ingObject.name = ingredientNames[i].value;
    ingObject.amount = ingredientAmount[i].value;
    ingObject.unit = ingredientUnits[i].value;
    ingObject.measures = {
      us: {
        amount: ingredientAmount[i].value,
        unitShort: ingredientUnits[i].value,
        unitLong: ingredientUnits[i].value,
      },
      metric: {
        amount: ingredientAmount[i].value,
        unitShort: ingredientUnits[i].value,
        unitLong: ingredientUnits[i].value,
      },
    };
    ingredientArray.push(ingObject);
  }
  finalObject.extendedIngredients = ingredientArray;

  // format step array
  const stepArray = [];
  for (let i = 0; i < steps.length; i += 1) {
    const stepObject = {};
    stepObject.number = i + 1;
    stepObject.step = steps[i].value;
    stepArray.push(stepObject);
  }
  finalObject.analyzedInstructions = {
    name: '',
    steps: stepArray,
  };

  // format summary
  const summary = document.querySelector(
    '.recipe-input-summary',
  );
  finalObject.summary = summary.value;

  // format nutrition
  const nutrition = document.querySelector(
    '.recipe-input-nutrition',
  );
  finalObject.nutrition = nutrition.value;

  // format preptime
  const preptime = document.querySelector(
    '.recipe-preptime',
  );
  finalObject.preparationMinutes = preptime.value;

  // format cooktime
  const cooktime = document.querySelector(
    '.recipe-cooktime',
  );
  finalObject.cookingMinutes = cooktime.value;

  // format image URL
  const imageUrl = document.querySelector(
    '.recipe-image-url',
  );
  finalObject.image = imageUrl.value;

  // format rating
  const rating = document.querySelector(
    '.recipe-rating',
  );
  finalObject.averageRating = rating.value;

  // format name:
  const recipeName = document.querySelector(
    '.recipe-input-name',
  );
  finalObject.title = recipeName.value;

  // assign a random id (use recipe name)
  const recipeId = recipeName.value;
  finalObject.id = recipeId;

  storageFuncs.storeRecipeData('created', [finalObject]);
  storageFuncs.saveRecipeToList('created', recipeId);

  console.log(finalObject);
};

/**
 * active when show more button click
 * add # more recipe cards by fetch # more recipe from API with offset
 * populate more recipe cards
 */
async function searchResultShowMore() {
  const query = getSearchQuery();
  const searchResultsContainer = document.getElementById('search-results-container');

  const numOfCardExist = searchResultsContainer.childElementCount;
  const numOfAdditionRecipeCards = 4;
  const pageOffset = numOfCardExist / numOfAdditionRecipeCards;

  const searchResult = await apiFuncs.getRecipesByName(query, numOfAdditionRecipeCards, pageOffset);
  storageFuncs.storeRecipeData(query, searchResult);

  const numOfRecipe = numOfAdditionRecipeCards + numOfCardExist;
  const localCategories = JSON.parse(localStorage.getItem('categories'));

  for (let i = numOfCardExist; (i < numOfRecipe) && (i < localCategories[query].length); i += 1) {
    const singleResultRecipeId = localCategories[query][i];
    createRecipeCards([singleResultRecipeId], searchResultsContainer, 1);
  }
}

function initializeButtons() {
  const addIngredientButton = document.querySelector('.add-ingredient-button');
  addIngredientButton.addEventListener('click', addIngredientClicked);

  // add step input to dom
  const addStepButton = document.querySelector('.add-step-button');
  addStepButton.addEventListener('click', addStepClicked);
  // create data object save to local storage.
  const createButton = document.querySelector('.create-recipe-button');
  createButton.addEventListener('click', createRecipeClicked);

  const showMoreButton = document.getElementById('show-more-button');
  showMoreButton.addEventListener('click', searchResultShowMore);
}

async function init() {
  initializeRoutes();
  bindPopState();
  populateExplore();
  populateSavedRecipes();
  initializeButtons();
}

window.addEventListener('DOMContentLoaded', init);
