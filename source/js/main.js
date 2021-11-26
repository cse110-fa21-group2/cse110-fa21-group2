// Import requried modules
import Router from './Router.js';
import * as storageFuncs from './storage/storage.js';
import * as fetcherFuncs from './storage/fetcher.js';
// TODO: fix require in apiFuncs
// import * as apiFuncs from './apiHelpers.js';

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

const router = new Router();

const openHome = () => {
  router.navigate('landing', false);
};

const openExplore = () => {
  router.navigate('explore', false);
};

const openSavedRecipes = () => {
  router.navigate('saved-recipes', false);
};

const openSearchResults = () => {
  // TODO: Fetch search results first
  router.navigate('search-results', false);
};

const openRecipeInfo = () => {
  // TODO: Populate page from JSON object
  router.navigate('recipe-info', false);
};

const openCreateRecipe = () => {
  router.navigate('create-recipe-page', false);
};

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

async function init() {
  initializeRoutes();
  bindPopState();

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

// createRecipeCards();
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
*/

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
 */
function createRecipeCards(arrData, location, numRecipesPopd = 5) {
  // Populate each section
  let i = 0;
  // Checks to make sure only populate as many as requested by numRecipesPopd or
  // until reach the end of the array of recipe ids i.e. ran out of recipes
  while (i < numRecipesPopd && i < arrData.length) {
    const recipeCard = document.createElement('recipe-card');
    // work-in-progress by Fred for populating recipe cards.
    recipeCard.data = fetcherFuncs.getSingleRecipe(parseInt(arrData[i], 10));
    location.appendChild(recipeCard);
    i += 1;
  }
}
