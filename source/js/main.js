import Router from './Router.js';
import * as storageFuncs from './storage/storage.js';
import * as fetcherFuncs from './storage/fetcher.js';
import * as apiFuncs from './apiHelpers.js';

// Constant variables (reduce magic numbers)

const DEFAULT_NUM_CARDS = 5;

// Dont touch
const SECTIONS = [
  'landing',
  'explore',
  'saved-recipes',
  'search-results',
  'recipe-info',
  'create-recipe-page',
];

// Can change to anything and will repopulate explore page automatically
const EXPLORE_SECTIONS = [
  'Main Course',
  'Side Dish',
  'Salad',
  'Breakfast',
];

const router = new Router();

/* DOM Manipulation helper functions */

/**
 * Used to generate router navigation functions
 * @param {String} active html section to open
 * @returns {function} a function that opens the given SPA page
 */
const openSection = (active) => () => SECTIONS.forEach(((val) => document.querySelector(`.${val}`).classList.toggle('hidden', val !== active)));

/**
 *
 * @param {HTMLElement} parent HTML container to clear
 */
const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

/**
 * Shuffle data elements so we don't always get the same first 5 cards
 * @param {Object[]} array
 * @returns {Object[]} array of mixed up values
 */
function shuffle(array) {
  const arr = array;
  let currentIndex = arr.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex], arr[currentIndex]];
  }

  return arr;
}

/**
 * Populates index.html with <recipe-card> elements, as defined in
 * RecipeCard.js. This function is meant to be called for each section that needs
 * to be populated with recipe cards.
 * @param {String[]} arrData an array of recipe ids (currently). example input:
 * [
 *    "123", // recipe id
 *    "111", // recipe id
 *    "444", // recipe id
 *  ]
 * @param {HTMLElement} location HTML container to populate cards into
 * @param {number} numRecipesPopd how many recipes are being populated (used with fetcherFuncs)
 */
const createRecipeCards = (arrData, location, maxCards = 5) => {
  for (let i = 0; i < maxCards && i < arrData.length; i++) {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.setAttribute('class', `id_${arrData[i]}`);
    // eslint-disable-next-line no-use-before-define
    recipeCard.populateFunc = openRecipeInfo;
    recipeCard.data = fetcherFuncs.getSingleRecipe(arrData[i]);
    location.appendChild(recipeCard);
  }
};

/**
 * @param {Object[]} items JSON data to use
 * @param {*} container to populate cards into
 */
const createCardsFromData = (items, container) => {
  items.forEach((item) => {
    const recipeCard = document.createElement('recipe-card');
    recipeCard.setAttribute('class', `id_${item.id}`);
    // eslint-disable-next-line no-use-before-define
    recipeCard.populateFunc = openRecipeInfo;
    recipeCard.data = item;
    container.appendChild(recipeCard);
  });
};

/* DOM Selection helper functions */

/**
 *
 * @returns {String} value of search bar field
 */
const getSearchQuery = () => document.querySelector('.form-control').value;

/* Page navigation functions and populate with data */

/**
 * Populates the ExpandedRecipeCard with data and navigates to the page
 * @param {Object} data - JSON object to use for page data
 */
function openRecipeInfo(data) {
  // Header section
  const title = document.querySelector('.info-title');
  title.innerHTML = data.title;

  const starValue = data.spoonacularScore / 20;
  const roundedStars = Math.round(starValue);

  const stars = document.getElementById('recipe-info-stars');
  stars.src = `./images/${roundedStars}-star.svg`;

  const line = document.createElement('span');
  line.classList.add('divider');

  const rating = document.getElementById('recipe-info-rating');
  rating.innerHTML = `${starValue} stars`;
  rating.appendChild(line);

  const likes = document.getElementById('recipe-info-likes');
  likes.innerHTML = `${data.aggregateLikes ?? 0} likes`;

  const image = document.getElementById('recipe-info-image');
  document.getElementById('recipe-info-image').classList.toggle('hidden', !data.image);
  image.src = data.image;

  const desc = document.getElementById('info-description');
  desc.innerHTML = data.summary;
  document.querySelector('.recipe-description-wrapper').classList.toggle('hidden', !data.summary);

  const list = document.getElementById('info-ingredients-list');
  removeAllChildNodes(list);

  data.extendedIngredients.forEach((item) => {
    const listElement = document.createElement('li');
    listElement.classList.add('info-ingredient');
    listElement.innerHTML = item.originalString;
    list.appendChild(listElement);
  });

  // Quick Facts
  const prepMinutes = data.preparationMinutes || 0;
  const totalMinutes = data.readyInMinutes || 0;
  const cookMinutes = data.cookingMinutes || 0;

  const prepTime = document.getElementById('prep-time');
  prepTime.innerHTML = `Prep Time: ${prepMinutes} minutes`;

  const cookTime = document.getElementById('cook-time');
  cookTime.innerHTML = `Cook Time: ${cookMinutes} minutes`;

  const totalTime = document.getElementById('total-time');
  totalTime.innerHTML = `Total Time: ${totalMinutes} minutes`;

  const servings = document.getElementById('info-servings');
  servings.innerHTML = `Servings: ${data.servings || 0}`;

  // Measurements
  // Base serving size for recipe
  const scaleServings = document.querySelector('.serving-size');
  scaleServings.innerHTML = data.servings;

  // TODO: Scale ingredients
  const stepsDiv = document.getElementById('step-list');
  removeAllChildNodes(stepsDiv);

  const stepsList = data?.analyzedInstructions[0]?.steps;
  stepsList?.forEach((item) => {
    const listElement = document.createElement('li');
    listElement.classList.add('steps');
    listElement.innerHTML = item.step;
    stepsDiv.appendChild(listElement);
  });

  // TODO: Find a video
  const video = null;
  const videoContainer = document.querySelector('.videos-wrapper');
  videoContainer.classList.toggle('hidden', !video);

  // TODO: Nutritional Info
  const nutrition = null;
  const nutritionContainer = document.querySelector('.nutrition-wrapper');
  nutritionContainer.classList.toggle('hidden', !nutrition);

  const saveBtn = document.getElementById('info-save-btn');

  const categories = fetcherFuncs.getAllSavedRecipeId();
  const saved = categories.favorites && categories.favorites.includes(data.id);
  saveBtn.innerHTML = saved ? 'Remove Recipe' : 'Save Recipe';

  saveBtn.addEventListener('click', () => {
    // TODO: Implement save button on recipe info page
  });

  router.navigate('recipe-info', false);
}

/**
 * Perform router navigation to open home page
 */
const openHome = () => {
  router.navigate('landing', false);
};

/**
 * Perform router navigation to open the explore page
 */
const openExplore = () => {
  router.navigate('explore', false);
};

/**
 * Perform router navigation to open saved recipes page
 */
const openSavedRecipes = () => {
  router.navigate('saved-recipes', false);
};

/**
 * Perform router navigation to open the create recipe page
 * @param {JSON} - optional JSON object data to populate page with
 */
const openCreateRecipe = (data) => {
  // TODO: Take in an object that prefills the fields on the create recipe page
  router.navigate('create-recipe-page', false);
};

/**
 * Populates the search results page with query results and navigates there
 * @returns {Promise<void>}
 */
const openSearchResults = async () => {
  const query = getSearchQuery();
  // Don't navigate if query is blank
  if (!query) return;

  const pageOffset = 0;
  const searchResultPageTitle = document.getElementById('search-results-title');
  searchResultPageTitle.innerHTML = `Loading results for "${query}"`;

  router.navigate('search-results', false);

  const searchResult = await apiFuncs.getRecipesByName(query, DEFAULT_NUM_CARDS, pageOffset);

  console.info(searchResult);
  searchResultPageTitle.innerHTML = searchResult.length !== 0 ? `Top recipes for "${query}"` : `No results found for "${query}"`;
  const storeName = `${query}popularitydesc1440`;
  storageFuncs.storeRecipeData(storeName, searchResult);

  const resultRecipeId = JSON.parse(localStorage.getItem('explore-categories'))[storeName];
  const searchResultsContainer = document.getElementById('search-results-container');
  removeAllChildNodes(searchResultsContainer);
  createRecipeCards(resultRecipeId, searchResultsContainer);
};

/* Sort and filtering functions */

/**
 *
 * @returns {String} sorting key
 */
const getSortKey = () => {
  const sorts = $('#sorts option:selected').filter(':selected').text().toLowerCase();
  return sorts === 'none selected' ? 'popularity' : sorts;
};

/**
 *
 * @returns {String} ordering key
 */
const getOrderingKey = () => {
  const ordering = $('#ordering option:selected').filter(':selected').text();
  return ordering === 'Ascending' ? 'asc' : 'desc';
};

/**
 *
 * @returns {String} meal type key
 */
const getMealTypeKey = () => {
  const mealType = $('#meal-type option:selected').filter(':selected').text().toLowerCase();
  return mealType === 'none selected' ? '' : mealType;
};

/**
 *
 * @returns {String} diet key
 */
const getDietKey = () => {
  const diet = $('#diets option:selected').filter(':selected').text();
  return diet === 'None selected' ? '' : diet;
};

/**
 *
 * @returns {String} max prep time
 */
const getMaxPrepTime = () => {
  const prepTime = document.getElementById('max-time').value;
  return prepTime === '720' ? '1440' : prepTime;
};

/**
 *
 * @returns {String} cuisine key
 */
const getCuisinesKeys = () => {
  let cuisineString = '';
  let firstTime = true;
  $('.filters-cuisine-body :checkbox').each(() => {
    const ischecked = $(this).is(':checked');
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

/**
 *
 * @returns {String} intolerances
 */
const geIntolerances = () => {
  let intoleranceString = '';
  let firstTime = true;
  $('.filters-intolerance-body :checkbox').each(() => {
    const ischecked = $(this).is(':checked');
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

/** Toggle display for show filters */
function displaySortFilter() {
  const displayLabel = document.getElementById('display-sort-filter');
  const hidden = displayLabel.innerHTML !== 'Show Sort and Filter';
  document.getElementById('sort-filter-body').classList.toggle('hidden', hidden);
  displayLabel.innerHTML = hidden ? 'Show Sort and Filter' : 'Hide Sort and Filter';
}

/** Toggle display for cuisine */
function displayCuisine() {
  const displayLabel = document.getElementById('cuisine-collapse');
  const down = displayLabel.innerHTML !== '↓';
  document.getElementById('cuisine-collapse-body').classList.toggle('hidden', down);
  displayLabel.innerHTML = down ? '↓' : '↑';
}

/** Toggle display for intolerances */
function displayIntolerance() {
  const displayLabel = document.getElementById('intolerance-collapse');
  const down = displayLabel.innerHTML !== '↓';
  document.getElementById('intolerance-collapse-body').classList.toggle('hidden', down);
  displayLabel.innerHTML = down ? '↓' : '↑';
}

/** Reset filtering settings */
function clearSortingAndFiltering() {
  document.getElementById('sorts').selectedIndex = 0;
  document.getElementById('ordering').selectedIndex = 0;
  document.getElementById('meal-type').selectedIndex = 0;
  document.getElementById('diets').selectedIndex = 0;
  document.querySelector('.filter-max-time-input > input').value = '';
  document.querySelector('.filter-max-time-input > output').value = 'Default';

  const cuisineFilter = document.querySelector('.filter-cuisine-input');
  const cuisineList = cuisineFilter.getElementsByTagName('input');
  for (let i = 0; i < cuisineList.length; i++) {
    cuisineList[i].checked = false;
  }

  const intolerancesFilter = document.querySelector('.filter-intolerance-input');
  const intolerancesList = intolerancesFilter.getElementsByTagName('input');
  for (let i = 0; i < intolerancesList.length; i++) {
    intolerancesList[i].checked = false;
  }
}
/* Create Recipe page event handlers */

/**
 * Event handler for add ingredient button on create recipe page
 */
const addIngredientClicked = () => {
  // Ingredient name input
  const ingNameInput = document.createElement('input');
  ingNameInput.type = 'text';
  ingNameInput.required = true;
  ingNameInput.placeholder = 'Name';
  ingNameInput.classList.add('form-control', 'recipe-ingredient-name');

  const ingNameDiv = document.createElement('div');
  ingNameDiv.classList.add('col');
  ingNameDiv.appendChild(ingNameInput);

  // Ingredient amount input
  const ingAmountInput = document.createElement('input');
  ingAmountInput.type = 'number';
  ingAmountInput.required = false;
  ingAmountInput.placeholder = 'Amount';
  ingAmountInput.classList.add('form-control', 'recipe-ingredient-amount');

  const ingAmountDiv = document.createElement('div');
  ingAmountDiv.classList.add('col');
  ingAmountDiv.appendChild(ingAmountInput);

  // Ingredient unit input
  const ingUnitInput = document.createElement('input');
  ingUnitInput.type = 'number';
  ingUnitInput.required = false;
  ingUnitInput.placeholder = 'Unit';
  ingUnitInput.classList.add('form-control', 'recipe-ingredient-unit');

  const ingUnitDiv = document.createElement('div');
  ingUnitDiv.classList.add('col');
  ingUnitDiv.appendChild(ingUnitInput);

  // Combine in row wrapper
  const ingRow = document.createElement('div');
  ingRow.classList.add('row', 'create-ingredient-fact');

  ingRow.appendChild(ingNameDiv);
  ingRow.appendChild(ingAmountDiv);
  ingRow.appendChild(ingUnitDiv);

  const createIngRoot = document.querySelector('.ingredient-input-list');
  createIngRoot.appendChild(ingRow);
};

/**
 * Event handler for add step button on create recipe page
 */
const addStepClicked = () => {
  const createStepRoot = document.querySelector('.step-input-list');
  const allStepInput = document.querySelectorAll('.recipe-step-input');
  const stepInput = document.createElement('textarea');
  stepInput.classList.add('form-control', 'recipe-step-input');
  stepInput.placeholder = `Step ${allStepInput.length + 1}`;
  stepInput.required = true;
  createStepRoot.appendChild(stepInput);
};

/**
 * Event handler for create recipe button on create recipe page
 */
const createRecipeClicked = () => {
  const ingredientAmount = document.querySelectorAll('.recipe-ingredient-amount');
  const ingredientUnits = document.querySelectorAll('.recipe-ingredient-unit');
  const ingredientNames = document.querySelectorAll('.recipe-ingredient-name');
  const serving = document.querySelector('.ingredient-serving-input');
  const summary = document.querySelector('.recipe-input-summary');
  const nutrition = document.querySelector('.recipe-input-nutrition');
  const preptime = document.querySelector('.recipe-preptime');
  const cooktime = document.querySelector('.recipe-cooktime');
  const imageUrl = document.querySelector('.recipe-image-url');
  const rating = document.querySelector('.recipe-rating');
  const steps = document.querySelectorAll('.recipe-step-input');
  const recipeName = document.querySelector('.recipe-input-name');
  const dropdown = document.querySelector('select.list-dropdown');

  const finalObject = {};

  const recipeId = recipeName.value.split(' ').join('_');

  // format serving
  finalObject.servings = serving.value;
  // format summary
  finalObject.summary = summary.value;
  // format nutrition
  finalObject.nutrition = nutrition.value;
  // format preptime
  finalObject.preparationMinutes = preptime.value;
  // format cooktime
  finalObject.cookingMinutes = cooktime.value;
  finalObject.readyInMinutes = parseInt(preptime.value, 10) + parseInt(cooktime.value, 10);
  // format image URL
  finalObject.image = imageUrl.value;
  // format rating
  finalObject.averageRating = rating.value;
  finalObject.spoonacularScore = rating.value * 20;
  // format name:
  finalObject.title = recipeName.value;
  // assign a random id (use recipe name replace space with _)
  finalObject.id = recipeId;

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
    ingObject.originalString = `${ingredientAmount[i].value} ${ingredientUnits[i].value} ${ingredientNames[i].value}`;
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

  finalObject.analyzedInstructions = [{
    name: '',
    steps: stepArray,
  }];

  storageFuncs.storeRecipeData('created', [finalObject]);
  storageFuncs.saveRecipeToList('created', recipeId);

  const currSavedPageSelect = dropdown.value;
  if (currSavedPageSelect === 'List 2') {
    const grid = document.querySelector('.saved-recipes .results-grid');
    // Remove all existing cards with matching id
    grid.querySelectorAll(`.id_${finalObject.id}`).forEach((card) => card.remove());

    // add card to saved recipe page
    const recipeCardNew = document.createElement('recipe-card');
    recipeCardNew.classList.add(`id_${finalObject.id}`);
    recipeCardNew.populateFunc = openRecipeInfo;
    recipeCardNew.data = finalObject;
    grid.appendChild(recipeCardNew);
  }
  openRecipeInfo(finalObject);
};

/* Recipe info page event handlers */

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
/* Search results page event handlers */

/**
 * Event handler for show more button on search results page
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

  const storeName = query + sorts + ordering + cuisineString + mealType + dietS
  + intoleranceString + maxPrepTime;
  storageFuncs.storeRecipeData(storeName, searchResult);

  const numOfRecipe = numOfAdditionRecipeCards + numOfCardExist;
  const localCategories = JSON.parse(localStorage.getItem('explore-categories'));

  for (let i = numOfCardExist; i < numOfRecipe && i < localCategories[storeName].length; i++) {
    const singleResultRecipeId = localCategories[storeName][i];
    createRecipeCards([singleResultRecipeId], searchResultsContainer, 1);
  }
}

/**
 * Event handler for apply filters button on search results page
 */
async function applyClicked() {
  const query = getSearchQuery();
  const searchResultsContainer = document.getElementById('search-results-container');

  const sorts = getSortKey();
  const ordering = getOrderingKey();
  const mealType = getMealTypeKey();
  const dietS = getDietKey();
  const maxPrepTime = getMaxPrepTime();
  const cuisineString = getCuisinesKeys();
  const intoleranceString = geIntolerances();

  // Example Response
  // {
  //   sort: 'calories',
  //    sortDirection: 'desc',
  //     cuisine: 'Mexican,Asian',
  //     type: 'lunch'
  // }
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

  const storeName = query + sorts + ordering + cuisineString + mealType + dietS
  + intoleranceString + maxPrepTime;
  storageFuncs.storeRecipeData(storeName, searchResult);
  removeAllChildNodes(searchResultsContainer);
  const resultRecipeId = JSON.parse(localStorage.getItem('explore-categories'))[storeName];
  createRecipeCards(resultRecipeId, searchResultsContainer);
}

/* Functions calls to initialize app */

/**
 * Set up navbar buttons to correctly work
 */
function initializeRoutes() {
  SECTIONS.forEach((section) => router.addPage(section, openSection(section)));

  document.getElementById('landing-nav').addEventListener('click', openHome);
  document.getElementById('explore-nav').addEventListener('click', openExplore);
  document.getElementById('saved-recipes-nav').addEventListener('click', openSavedRecipes);
  document.getElementById('create-recipe-nav').addEventListener('click', openCreateRecipe);
  document.getElementById('search-results-nav').addEventListener('click', openSearchResults);
}

/**
 * Set up browser history to correctly navigate using our router
 */
function bindPopState() {
  window.addEventListener('popstate', (e) => {
    const { state } = e;
    router.navigate(state ? state.page : 'landing', true);
  });
}

/**
 * Fetch data to populate the explore page on initial load
 */
async function populateExplore() {
  const explorePage = document.querySelector('.explore');

  const randOffset = Math.floor(Math.random() * 150);

  EXPLORE_SECTIONS.forEach(async (section) => {
    const rowTitle = document.createElement('h1');
    rowTitle.classList.add('row-title');
    rowTitle.innerHTML = `Top ${section} Recipes`;

    const bar = document.createElement('hr');
    bar.classList.add('line');

    const rowContainer = document.createElement('div');
    rowContainer.classList.add('recipe-row');

    const exploreResults = await apiFuncs.getRecipesByType(section, DEFAULT_NUM_CARDS, randOffset);
    // TODO: just store the data in localStorage and ignore the list
    storageFuncs.storeRecipeData(section, exploreResults);
    createCardsFromData(exploreResults, rowContainer);

    const exploreDiv = document.createElement('div');
    exploreDiv.appendChild(rowTitle);
    exploreDiv.appendChild(bar);
    exploreDiv.appendChild(rowContainer);

    explorePage.appendChild(exploreDiv);
  });
}

/**
 * Populate saved recipe cards based on active dropdown
 */
function populateSavedRecipes() {
  // Location where recipe cards are to be added
  const grid = document.querySelector('.saved-recipes .results-grid');

  // Get IDs from localStorage using fetcher functions
  const allSavedIds = fetcherFuncs.getAllSavedRecipeId();
  // initialization
  const currSavedPageSelect = document.querySelector('select.list-dropdown').value;
  if (currSavedPageSelect === 'favorites') {
    // add favorites cards to grid
    createRecipeCards(allSavedIds.favorites, grid);
  } else if (currSavedPageSelect === 'created') {
    // add created recipe cards to grid
    createRecipeCards(allSavedIds.created, grid);
  }
}

function onDropdownChange() {
  // Location where recipe cards are to be added
  const grid = document.querySelector('.saved-recipes .results-grid');
  // Get IDs from localStorage using fetcher functions
  const allSavedIds = fetcherFuncs.getAllSavedRecipeId();
  const currSavedPageSelect = document.querySelector('select.list-dropdown').value;
  removeAllChildNodes(grid);
  if (currSavedPageSelect === 'favorites') {
    createRecipeCards(allSavedIds.favorites, grid);
  } else if (currSavedPageSelect === 'created') {
    createRecipeCards(allSavedIds.created, grid);
  }
}

/**
 * Link event handlers to proper buttons
 */
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

  const createRecipeForm = document.querySelector('.create-recipe-page-form');
  createRecipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createRecipeClicked();
  });

  /* Search Results Page */
  const showMoreButton = document.getElementById('show-more-button');
  showMoreButton.addEventListener('click', showMoreClicked);

  const displaySortFilterButton = document.getElementById('display-sort-filter');
  displaySortFilterButton.addEventListener('click', displaySortFilter);

  const cuisineCollapse = document.getElementById('cuisine-collapse');
  cuisineCollapse.addEventListener('click', displayCuisine);

  const intoleranceCollapse = document.getElementById('intolerance-collapse');
  intoleranceCollapse.addEventListener('click', displayIntolerance);

  const clearSortingAndFilteringButton = document.getElementById('clear-sort-filter');
  clearSortingAndFilteringButton.addEventListener('click', clearSortingAndFiltering);

  const applyButton = document.getElementById('apply-sort-filter');
  applyButton.addEventListener('click', applyClicked);

  /* Saved Recipe Page */
  const savedPageSelect = document.querySelector('select.list-dropdown');
  savedPageSelect.addEventListener('change', onDropdownChange);
}

function initializeLocalStorage() {
  storageFuncs.createKey('savedLists');
  storageFuncs.createKey('recipeData');
  storageFuncs.createKey('explore-categories');
  storageFuncs.createList('favorites');
  storageFuncs.createList('created');
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
