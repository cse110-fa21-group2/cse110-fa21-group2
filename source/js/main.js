/* eslint-disable no-plusplus */
// main.js
/**
 * NOTE: TO USE:
 * 	There are three file-scope variables used:
 * 		1. pagesArr 				// array of ALL HTML section elements representing the pages
 * 		2. pageNames 				// string array of ALL names of the pages
 * 		3. pagesArrLinkEls	// array of ONLY pages in website header/navbar as links/buttons there
 * 	The indices of these arrays correspond (i.e., ith index corresponds to info for same page
 * 	for each.)
 * 
 * If you wish to add/remove a page, then add/remove it from each of these arrays.
 * 	- To do so, for pagesArr and pageNames, change its initialization at the top of the file
 * 		(i.e., where both are initialized)
 * 	- For pagesArrLinkEls, modify the createArrPageLinks() function to create links
 * 		only for those pages you wish to have in the header/navbar of the website.
 */

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
let createRecipePage;

// initialize "pages":
landingPage = document.querySelector('section.landing');
explorePage = document.querySelector('section.explore');
savedRecipePage = document.querySelector('section.saved-recipes');
searchResults = document.querySelector('section.search-results');
recipeInfoPage = document.querySelector('section.recipe-info');
createRecipePage = document.querySelector('section.create-recipe-page');


// initialize array of all pages (their html section elements):
const pagesArr = [landingPage, explorePage, savedRecipePage,
	searchResults, recipeInfoPage, createRecipePage];

// initialize array of all page names:
const pageNames = ["landing", "explore", "saved-recipe",
"search-results", "recipe-info", "create-recipe"];

// array for links to pages:
let pagesArrLinkEls = [ ];

// go to Landing Page as home page:
router = new Router(() => {
	landingPage.classList.remove('hidden');
	explorePage.classList.add('hidden');
	savedRecipePage.classList.add('hidden');
	searchResults.classList.add('hidden');
	recipeInfoPage.classList.add('hidden');
});

window.addEventListener('DOMContentLoaded', init);

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

  // Function calls
  // Fetch recipes and store locally if storage is empty.
  /*
  let storageCategoryData = fetcherFuncs.getAllCategoryRecipe();

	// ** for testing, have store the 10 recipes from sample JSON file: ** 
	// storageCategoryData =
	//storageCategoryData = sampleRecipes.json;
	// console.log("storageCategoryData:");
	// console.log(storageCategoryData);

	
  const categoryNames = ['popular', 'cheap', 'healthy', 'fast'];
	// fetch from api for (categoryNames[i], 10)
	//let fetchedData = [];
	//fetchedData = fetchRecs();
  for (let i = 0; i < categoryNames.length; i++) {
    if (!(categoryNames[i] in storageCategoryData)
        || storageCategoryData[categoryNames[i]].length < 10) {

       // store to local storage
       storageFuncs.storeRecipeData(categoryNames[i], fetchedData);
    }
  }
  createExploreRecipeCards(storageCategoryData);

   
  const storageSavedData = fetcherFuncs.getAllSavedRecipe();
*/

bindPopstate();
bindEscKey(); // TODO: needs to be applied instead to where recipe cards are

// "create" all pages for router, and bind
// website header/navbar links to their
// corresponding pages:
addPagesToRouter();
createArrPageLinks();
}


/**
 * Adds a page to router that hides all other pages
 * while showing that page.
 * @param {Element} pageToShow the html section for page to show
 * @param {String} pageName the name of the page to show/go-to
 */
function addPageToRouterHelper(pageToShow, pageName) {
	router.addPage(pageName, () => {
		// hide all but given page:
		for(let i = 0; i < pagesArr.length; i++) {
			if(pagesArr[i] == pageToShow) {
				pageToShow.classList.remove("hidden");
			}
			else {
				pagesArr[i].classList.add("hidden");
			}
		}
	});
}

/**
 * Adds all the pages to the router (assuming/using
 * that pagesArr stores all the pages): 
 */
function addPagesToRouter() {
	for(let i = 0; i < pagesArr.length; i++) {
		addPageToRouterHelper(pagesArr[i], pageNames[i]);
	}
}


/**
 * Binds website header/navbar links ("Home", "Explore", etc.)
 * to their corresponding pages with router.
 * @param {string} pageToShow the section wrapper element for page to go to 
 * @param {Object} linkEl the link element (<a>) to click to go to that page
 */
function bindPageToClickLink(pageToShow, linkEl) {
	linkEl.addEventListener("click", () => {
		router.navigate(pageToShow, false);
	})
}

/**
 * Populates pagesArrLinkEls, an array, such that its ith element
 * is the html link (<a>) element that will go to the ith page
 * in pagesArr, and binds them to on-click event
 */
function createArrPageLinks() {
	// html link elements in navbar to pages:
	let homePageLink = document.querySelector("#Home_Link");
	let explorePageLink = document.querySelector("#Explore_Link");
	let savedRecsPageLink = document.querySelector("#Saved_Recipes_Link");

	// populating links array:
	pagesArrLinkEls[0] = homePageLink;
	pagesArrLinkEls[1] = explorePageLink;
	pagesArrLinkEls[2] = savedRecsPageLink;

	// bind links so when clicked navigate via router to them:
	for(let i = 0; i < pagesArrLinkEls.length; i++) {
		bindPageToClickLink(pageNames[i], pagesArrLinkEls[i]);
	}
}


/**
 *
 * @param {Element} rec the recipe to prepare for clicking
 * @param {String} recPageName the name of page for that recipe
 */
// eslint-disable-next-line no-unused-vars
function prepRecipeForClick(rec, recPageName) {
  rec.addEventListener('click', () => {
    router.navigate(recPageName, false);
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
 function bindPopstate() {
  /**
   * TODO - Part 1 Step 6
   * Finally, add an event listener to the window object for the 'popstate'
   * event - this fires when the forward or back buttons are pressed in a browser.
   * If your event has a state object that you passed in, navigate to that page,
   * otherwise navigate to 'home'.
   * 
   * IMPORTANT: Pass in the boolean true as the second argument in navigate() here
   * so your navigate() function does not add your going back action to the history,
   * creating an infinite loop
   */
  window.addEventListener('popstate', logicPopstateForRouter);
}

function logicPopstateForRouter(event) {
	if(event.state != undefined)
	{
		console.log("State of event fired for popstate: " + event.state["pageHash"]);
		if(event.state["pageHash"] == "") // navigate to home:
		{
			router.navigate("home", true);
		} else {
			router.navigate(event.state["pageHash"], true); // i.e., keep # at beginning of page name

		}
	} else {
		router.navigate("home", true);
	}
}


/* ********* OPTIONAL: escape key from lab (when pressed, goes back to home/landing page): ********8
/**
 * Binds the 'keydown' event listener to the Escape key (esc) such that when
 * it is clicked, the home page is returned to
 */
 function bindEscKey() {
  /**
   * TODO - Part 1 Step 5
   * For this step, add an event listener to document for the 'keydown' event,
   * if the escape key is pressed, use your router to navigate() to the 'home'
   * page. This will let us go back to the home page from the detailed page.
   */
  // self-coded:
  window.addEventListener('keydown', event => {
    console.log("Key pressed: " + event.key);
    if(event.key == "Escape") {
      router.navigate("home", false);
    }
  })
}

/** ** OLD: ** 
 * Generates the <recipe-card> elements from fetched recipes and appends them to page
 * @param storageCategoryData a JSON Object {category: RecipeJSON, ...}
 */
 function createExploreRecipeCards(storageCategoryData) {
	// get explore-section "wrapper" (for "Trending Recipes"):
	let expSecEl = document.querySelector("explore-rec-section");
	
	// create recipe cards (i.e., for each recipe, create card):
  Object.keys(storageCategoryData).forEach((category) => {
		let currCatRecIDs = Object.keys(category); // ids of current category

		// for each recipe of current category ("breakfast", "lunch", etc.):
		for (let recId of currCatRecIDs) {
			let recipeCard = document.createElement('recipe-card');

			// set from passed-in storageCategoryData:
			recipeCard.data = storageCategoryData[category][recId];

			// recipeCard.data = localStorage['recipeData'][recId]; // assumes recipe is already in local storage:

			// use # + recipe ids as page names for (expanded) recipes
			recId = storageCategoryData[category][recId]["id"]; // set to ID of recipe
			const page = '#' + recId; 

			// adds function for going from: recipe card => expanded recipe card page
			router.addPage(page, () => {
				// assume 'hidden' performs opposite of 'shown' from lab 7:

				document.querySelector('section.landing').classList.add("hidden");
				document.querySelector('section.section--recipe-cards').classList.add('hidden');
				document.querySelector('section.section--recipe-expand').classList.remove('hidden');
				document.querySelector('recipe-expand').data = recipeCard.data;
				
			});
			// binds recipeCard for clicking to go to expanded page
			prepRecipeForClick(recipeCard, page);

			// add to html: append to explore section element custom element: 
			let recCardWrapperEl = document.querySelector("div.recipe-cards--wrapper");
			recCardWrapperEl.appendChild(recipeCard);
			// **Note: so when I do expSecEl.appendChild(recipeCard);, of appending
			// the recipe cards to a custom html element also, then they won't show/appear
			// on the webpage, even though their html is there; appending them
			// to a "standard" html element (here, "div") seems to enable them both
			// to have their html there but also appear visualyl on the page.
		}
  })   

  const storageSavedData = fetcherFuncs.getAllSavedRecipe();
}


// get router:
export default function getRouter() {
	return router;
}