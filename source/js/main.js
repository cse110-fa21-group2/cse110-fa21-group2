/* eslint-disable no-undef */
import Router from './Router.js';
import * as storageFuncs from './storage/storage.js';
import * as fetcherFuncs from './storage/fetcher.js';
import * as apiFuncs from './apiHelpers.js';

// TODO: Remove this tester later
import { returnDummyData } from '../demo-code/exampleData.js';

// Constant variables (reduce magic numbers)

const tempData = returnDummyData();

const DEFAULT_NUM_CARDS = 5;

const sections = [
  'landing',
  'explore',
  'saved-recipes',
  'search-results',
  'recipe-info',
  'create-recipe-page',
];

const router = new Router();
window.router = router; // For testing only, manually call window.router.navigate in browser console

/* Helper functions */

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

const getSearchQuery = () => document.querySelector('.form-control').value;

const getSortKey = () => {
  let sorts = $('#sorts option:selected').filter(':selected').text().toLowerCase();
  if (sorts === 'none selected') {
    sorts = 'popularity';
  }
  return sorts;
};

const getOrderingKey = () => {
  const ordering = $('#ordering option:selected').filter(':selected').text();
  if (ordering === 'Ascending') {
    return 'asc';
  }
  return 'desc';
};

const getMealTypeKey = () => {
  let mealType = $('#meal-type option:selected').filter(':selected').text().toLowerCase();
  if (mealType === 'none selected') {
    mealType = '';
  }
  return mealType;
};

const getDietKey = () => {
  let dietS = $('#diets option:selected').filter(':selected').text();
  if (dietS === 'None selected') {
    dietS = '';
  }
  return dietS;
};

const getMaxPrepTime = () => {
  const prepTime = document.getElementById('max-time').value;
  console.log(prepTime);
  if (prepTime === '0') {
    return '1440';
  }
  return prepTime;
};

const getCuisinesKeys = () => {
  let cuisineString = '';
  let firstTime = true;
  $('.filters-cuisine-body :checkbox').each(function () {
    const ischecked = $(this).is(':checked'); // check if checked
    if (ischecked) {
      const value = $(this).attr('value');
      if (firstTime) {
        cuisineString += value;
        firstTime = false;
      } else {
        cuisineString += `,${value}`;
      }
    }
  });
  return cuisineString;
};

const geIntolerances = () => {
  let intoleranceString = '';
  let firstTime = true;
  $('.filters-intolerance-body :checkbox').each(function () {
    const ischecked = $(this).is(':checked'); // check if checked
    if (ischecked) {
      const value = $(this).attr('value');
      if (firstTime) {
        intoleranceString += value;
        firstTime = false;
      } else {
        intoleranceString += `,${value}`;
      }
    }
  });
  return intoleranceString;
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

/**
 * Populates the ExpandedRecipeCard with data
 * @param {Object} data - JSON object to use for page data
 */
function openRecipeInfo(data) {
  // Header section
  const title = document.querySelector('.info-title');
  title.innerHTML = data.title;

  const starValue = data.spoonacularScore / 20;
  const roundedStars = Math.round(starValue);

  const stars = document.getElementById('recipe-info-stars');
  stars.src = `./source/images/${roundedStars}-star.svg`;

  const line = document.createElement('span');
  line.classList.add('divider');

  const rating = document.getElementById('recipe-info-rating');
  rating.innerHTML = `${starValue} stars`;
  rating.appendChild(line);

  const likes = document.getElementById('recipe-info-likes');
  likes.innerHTML = `${data.aggregateLikes} likes`;

  const image = document.getElementById('recipe-info-image');
  image.src = data.image;

  const desc = document.getElementById('info-description');
  desc.innerHTML = data.summary;

  const list = document.getElementById('info-ingredients-list');
  removeAllChildNodes(list);

  data.extendedIngredients.forEach((item) => {
    const listElement = document.createElement('li');
    listElement.classList.add('info-ingredient');
    listElement.innerHTML = item.originalString;
    list.appendChild(listElement);
  });

  // Quick Facts
  const prepMinutes = data.preparationMinutes ?? 0;
  const totalMinutes = data.readyInMinutes ?? 0;
  const cookMinutes = data.cookingMinutes ?? 0;

  const prepTime = document.getElementById('prep-time');
  prepTime.innerHTML = `Prep Time: ${prepMinutes} minutes`;

  const cookTime = document.getElementById('cook-time');
  cookTime.innerHTML = `Cook Time: ${cookMinutes} minutes`;

  const totalTime = document.getElementById('total-time');
  totalTime.innerHTML = `Total Time: ${totalMinutes} minutes`;

  const servings = document.getElementById('info-servings');
  servings.innerHTML = `Servings: ${data.servings}`;

  // TODO: Scale ingredients

  const stepsDiv = document.getElementById('step-list');
  removeAllChildNodes(stepsDiv);

  const stepsList = data.analyzedInstructions[0].steps;
  stepsList.forEach((item) => {
    const listElement = document.createElement('li');
    listElement.classList.add('steps');
    listElement.innerHTML = item.step;
    stepsDiv.appendChild(listElement);
  });

  // TODO: Find a video
  const video = null;
  const videoContainer = document.querySelector('.videos-wrapper');
  if (video) {
    // do something;
    videoContainer.classList.remove('hidden');
  } else {
    videoContainer.classList.add('hidden');
  }

  // TODO: Nutritional Info
  const nutrition = null;
  const nutritionContainer = document.querySelector('.nutrition-wrapper');
  if (nutrition) {
    // do something;
    nutritionContainer.classList.remove('hidden');
  } else {
    nutritionContainer.classList.add('hidden');
  }

  const saveBtn = document.getElementById('info-save-btn');

  const categories = fetcherFuncs.getAllSavedRecipeId();
  const saved = categories.favorites && categories.favorites.includes(data.id);
  saveBtn.innerHTML = saved ? 'Remove Recipe' : 'Save Recipe';

  const flipSaved = () => {
    // categories = fetcherFuncs.getAllSavedRecipeId();
    // saved = categories.favorites && categories.favorites.includes(data.id);
    // console.log(`Saved: ${saved}`);
    // if (saved) {
    //   // Remove from saved recipes
    //   saveBtn.innerHTML = 'Save Recipe';
    //   storageFuncs.removeRecipeFromList('favorites', data.id);
    // } else {
    //   // Add to saved recipes
    //   saveBtn.innerHTML = 'Remove Recipe';
    //   storageFuncs.saveRecipeToList('favorites', data.id);
    // }
    // const currSavedPageSelect = document.querySelector('select.list-dropdown').value;
    // const currCards = document.querySelectorAll(`.id_${this.json.id}`);

    // if (this.saved) {
    //   saveBtn.innerHTML = 'Save Recipe';
    //   storageFuncs.removeRecipeFromList('favorites', this.json.id);
    //   if (currSavedPageSelect === 'List 1') {
    //     // remove card in saved recipe page
    //     const grid = document.querySelector('.saved-recipes .results-grid');
    //     const currentCardsSaved = grid.querySelectorAll(`.id_${this.json.id}`);
    //     for (let i = 0; i < currentCardsSaved.length; i++) {
    //       currentCardsSaved[i].remove();
    //     }
    //   }
    // } else {
    //   saveBtn.innerHTML = 'Remove Recipe';

    //   storageFuncs.saveRecipeToList('favorites', this.json.id);
    //   if (currSavedPageSelect === 'List 1') {
    //     // add card to saved recipe page
    //     const grid = document.querySelector('.saved-recipes .results-grid');
    //     const recipeCardNew = document.createElement('recipe-card');
    //     recipeCardNew.setAttribute('class', `id_${this.json.id}`);
    //     recipeCardNew.populateFunc = openRecipeInfo;
    //     recipeCardNew.data = this.json;
    //     grid.appendChild(recipeCardNew);
    //   }
    // }
    // for (let i = 0; i < currCards.length; i++) {
    //   const { shadowRoot } = currCards[i];
    //   const element = shadowRoot
    //     .querySelector('.card-save-button')
    //     .querySelector('i');
    //   if (currCards[i].saved) {
    //     element.classList.add('far');
    //     element.classList.remove('fas');
    //   } else {
    //     element.classList.remove('far');
    //     element.classList.add('fas');
    //   }
    //   currCards[i].saved = !currCards[i].saved;
    // }
  };

  saveBtn.addEventListener('click', flipSaved);

  router.navigate('recipe-info', false);
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
const createRecipeCards = (arrData, location, numRecipesPopd = 5) => {
  // Populate each section
  let i = 0;
  // Checks to make sure only populate as many as requested by numRecipesPopd or
  // until reach the end of the array of recipe ids i.e. ran out of recipes
  while (i < numRecipesPopd && i < arrData.length) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.setAttribute('class', `id_${arrData[i]}`);
    // work-in-progress by Fred for populating recipe cards.
    recipeCard.populateFunc = openRecipeInfo;
    recipeCard.data = fetcherFuncs.getSingleRecipe(arrData[i]);
    location.appendChild(recipeCard);
    i += 1;
  }
};

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
  const query = getSearchQuery();
  // Don't navigate if query is blank
  if (!query) return;

  const numOfRecipe = DEFAULT_NUM_CARDS;
  const pageOffset = 0;
  const searchResultPageTitle = document.getElementById('search-results-title');
  searchResultPageTitle.innerHTML = `Top recipes for "${query}"`;
  const searchResult = await apiFuncs.getRecipesByName(query, numOfRecipe, pageOffset);

  const storeName = `${query}popularitydesc1440`;
  storageFuncs.storeRecipeData(storeName, searchResult);

  const resultRecipeId = JSON.parse(localStorage.getItem('explore-categories'))[storeName];
  const searchResultsContainer = document.getElementById('search-results-container');
  removeAllChildNodes(searchResultsContainer);
  createRecipeCards(resultRecipeId, searchResultsContainer, numOfRecipe);

  router.navigate('search-results', false);
};

/* Other event handlers */

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

  // assign a random id (use recipe name replace space with _)
  const recipeId = recipeName.value.split(' ').join('_');
  finalObject.id = recipeId;

  storageFuncs.storeRecipeData('created', [finalObject]);
  storageFuncs.saveRecipeToList('created', recipeId);

  const currSavedPageSelect = document.querySelector('select.list-dropdown').value;
  if (currSavedPageSelect === 'List 2') {
    // add card to saved recipe page
    const grid = document.querySelector('.saved-recipes .results-grid');
    const recipeCardNew = document.createElement('recipe-card');
    recipeCardNew.setAttribute('class', `id_${finalObject.id}`);
    recipeCardNew.populateFunc = openRecipeInfo;
    recipeCardNew.data = finalObject;
    grid.appendChild(recipeCardNew);
  }

  console.log(finalObject);
};

/**
 * active when show more button click
 * add # more recipe cards by fetch # more recipe from API with offset
 * populate more recipe cards
 */
async function showMoreClicked() {
  const query = getSearchQuery();
  const searchResultsContainer = document.getElementById('search-results-container');
  const numOfCardExist = searchResultsContainer.childElementCount;
  const numOfAdditionRecipeCards = DEFAULT_NUM_CARDS;

  const sorts = getSortKey();
  const ordering = getOrderingKey();
  const mealType = getMealTypeKey();
  const dietS = getDietKey();
  const maxPrepTime = getMaxPrepTime();
  const cuisineString = getCuisinesKeys();
  const intoleranceString = geIntolerances();

  const searchResult = await apiFuncs.getRecipesByName(
    query,
    DEFAULT_NUM_CARDS,
    numOfCardExist,
    {
      sort: sorts,
      sortDirection: ordering,
      cuisine: cuisineString,
      type: mealType,
      diet: dietS,
      intolerances: intoleranceString,
      maxReadyTime: maxPrepTime,
    },
  );
  console.log(searchResult);

  const storeName = query + sorts + ordering + cuisineString + mealType + dietS
  + intoleranceString + maxPrepTime;
  storageFuncs.storeRecipeData(storeName, searchResult);

  const numOfRecipe = numOfAdditionRecipeCards + numOfCardExist;
  const localCategories = JSON.parse(localStorage.getItem('explore-categories'));

  for (let i = numOfCardExist; (i < numOfRecipe) && (i < localCategories[storeName].length);
    i += 1) {
    const singleResultRecipeId = localCategories[storeName][i];
    createRecipeCards([singleResultRecipeId], searchResultsContainer, 1);
  }
}

async function applyClicked() {
  const query = getSearchQuery();
  const searchResultsContainer = document.getElementById('search-results-container');

  // get filter and sort info from interface
  const sorts = getSortKey();
  const ordering = getOrderingKey();
  const mealType = getMealTypeKey();
  const dietS = getDietKey();
  const maxPrepTime = getMaxPrepTime();
  const cuisineString = getCuisinesKeys();
  const intoleranceString = geIntolerances();

  console.log(sorts);
  console.log(ordering);
  console.log(mealType);
  console.log(dietS);
  console.log(maxPrepTime);
  console.log(cuisineString);
  console.log(intoleranceString);

  // example: {sort:'calories', sortDirection:'desc', cuisine: 'Mexican,Asian', type:'lunch'}
  const searchResult = await apiFuncs.getRecipesByName(
    query,
    DEFAULT_NUM_CARDS,
    0,
    {
      sort: sorts,
      sortDirection: ordering,
      cuisine: cuisineString,
      type: mealType,
      diet: dietS,
      intolerances: intoleranceString,
      maxReadyTime: maxPrepTime,
    },
  );
  console.log(searchResult);

  const storeName = query + sorts + ordering + cuisineString + mealType + dietS
  + intoleranceString + maxPrepTime;
  console.log(storeName);
  storageFuncs.storeRecipeData(storeName, searchResult);
  removeAllChildNodes(searchResultsContainer);
  const resultRecipeId = JSON.parse(localStorage.getItem('explore-categories'))[storeName];
  createRecipeCards(resultRecipeId, searchResultsContainer, DEFAULT_NUM_CARDS);
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

function scaleRecipeUp(recipe) {
  const servingSize = document.querySelector('.serving-size');
  servingSize.innerHTML = parseInt(servingSize.innerHTML, 10) + 1;
}

function scaleRecipeDown(recipe) {
  const servingSize = document.querySelector('.serving-size');
  if (servingSize.innerHTML <= 1) {
    return;
  }
  servingSize.innerHTML = parseInt(servingSize.innerHTML, 10) - 1;
}
/* Functions calls to initialize app */

function initializeRoutes() {
  sections.forEach((section) => router.addPage(section, openSection(section)));

  document.getElementById('landing-nav').addEventListener('click', openHome);
  document.getElementById('explore-nav').addEventListener('click', openExplore);
  document.getElementById('saved-recipes-nav').addEventListener('click', openSavedRecipes);
  document.getElementById('create-recipe-nav').addEventListener('click', openCreateRecipe);
  document.getElementById('search-results-nav').addEventListener('click', openSearchResults);
}

function bindPopState() {
  window.addEventListener('popstate', (e) => {
    const { state } = e;
    router.navigate(state ? state.page : 'landing', true);
  });
}

function populateExplore() {
  const exploreSections = document.querySelectorAll('.explore-section .recipe-row');

  // TODO: PRE-API IMPLEMENTATION | COMMENT/DELETE ONCE LOCALSTORAGE POPULATED BY API
  const breakfastArrRecipe = [
    tempData[0],
    tempData[1],
  ];
  storageFuncs.storeRecipeData('breakfast', breakfastArrRecipe);

  const lunchArrRecipe = [
    tempData[2],
    tempData[3],
  ];
  storageFuncs.storeRecipeData('lunch', lunchArrRecipe);

  const dinnerArrRecipe = [
    tempData[4],
    tempData[5],
  ];
  storageFuncs.storeRecipeData('dinner', dinnerArrRecipe);

  const trendingArrRecipe = [
    tempData[6],
    tempData[7],
    tempData[8],
  ];
  storageFuncs.storeRecipeData('trending', trendingArrRecipe);
  // ********* //

  // Get IDs from localStorage using fetcher functions
  const allCategoriesIds = fetcherFuncs.getAllCategoryRecipeId();

  // Iterate through each category in explore IDs and add recipe cards using their IDs
  exploreSections.forEach((section) => {
    Object.keys(allCategoriesIds).forEach((category) => {
      if (section.id === category) {
        createRecipeCards(allCategoriesIds[category], section, DEFAULT_NUM_CARDS);
      }
    });
  });
}

function populateSavedRecipes() {
  // TODO: PRE-API IMPLEMENTATION | COMMENT/DELETE ONCE LOCALSTORAGE POPULATED BY API
  storageFuncs.createList('favorites');
  // storageFuncs.saveRecipeToList('favorites', 1987);
  // storageFuncs.saveRecipeToList('favorites', 5981);
  // ******* //
  // Location where recipe cards are to be added
  const grid = document.querySelector('.saved-recipes .results-grid');

  // Get IDs from localStorage using fetcher functions
  const allSavedIds = fetcherFuncs.getAllSavedRecipeId();
  // initialization
  const currSavedPageSelect = document.querySelector('select.list-dropdown').value;
  if (currSavedPageSelect === 'List 1' && 'favorites' in allSavedIds) {
    // add favorites cards to grid
    createRecipeCards(allSavedIds.favorites, grid, DEFAULT_NUM_CARDS);
  } else if (currSavedPageSelect === 'List 2' && 'created' in allSavedIds) {
    // add created recipe cards to grid
    createRecipeCards(allSavedIds.created, grid, DEFAULT_NUM_CARDS);
  }
}

function savedRecipePageDropDown() {
  // Location where recipe cards are to be added
  const grid = document.querySelector('.saved-recipes .results-grid');
  // Get IDs from localStorage using fetcher functions
  const allSavedIds = fetcherFuncs.getAllSavedRecipeId();
  const currSavedPageSelect = document.querySelector('select.list-dropdown').value;
  removeAllChildNodes(grid);
  if (currSavedPageSelect === 'List 1' && 'favorites' in allSavedIds) {
    // add favorites cards to grid
    createRecipeCards(allSavedIds.favorites, grid, DEFAULT_NUM_CARDS);
  } else if (currSavedPageSelect === 'List 2' && 'created' in allSavedIds) {
    // add created recipe cards to grid
    createRecipeCards(allSavedIds.created, grid, DEFAULT_NUM_CARDS);
  }
}

function initializeButtons() {
  /* Landing Page */
  const landingExplore = document.getElementById('landing-explore-btn');
  landingExplore.addEventListener('click', openExplore);

  const landingSaved = document.getElementById('landing-saved-btn');
  landingSaved.addEventListener('click', openSavedRecipes);

  /* Recipe Info Page */
  const backBtn = document.getElementById('info-back-btn');
  backBtn.addEventListener('click', () => history.back());

  /* Create Recipe Page */
  const addIngredientButton = document.querySelector('.add-ingredient-button');
  addIngredientButton.addEventListener('click', addIngredientClicked);

  const addStepButton = document.querySelector('.add-step-button');
  addStepButton.addEventListener('click', addStepClicked);

  const createButton = document.querySelector('.create-recipe-button');
  createButton.addEventListener('click', createRecipeClicked);

  /* Search Results Page */
  const showMoreButton = document.getElementById('show-more-button');
  showMoreButton.addEventListener('click', showMoreClicked);

  const applyButton = document.getElementById('submit-FS');
  applyButton.addEventListener('click', applyClicked);

  /* Saved Recipe Page */
  const savedPageSelect = document.querySelector('select.list-dropdown');
  savedPageSelect.addEventListener('change', savedRecipePageDropDown);
}

function initializeLocalStorage() {
  if (!window.localStorage.getItem('savedLists')) {
    window.localStorage.setItem('savedLists', JSON.stringify({}));
  }
  if (!window.localStorage.getItem('recipeData')) {
    window.localStorage.setItem('recipeData', JSON.stringify({}));
  }
  if (!window.localStorage.getItem('explore-categories')) {
    window.localStorage.setItem('explore-categories', JSON.stringify({}));
  }
}

async function init() {
  initializeLocalStorage();
  initializeRoutes();
  bindPopState();
  populateExplore();
  populateSavedRecipes();
  initializeButtons();
}

window.addEventListener('DOMContentLoaded', init);
