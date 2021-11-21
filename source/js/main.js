/* eslint-disable no-plusplus */
// main.js

// Import requried modules
import Router from '/source/scripts/recipe_pages_router.js';
import * as storageFuncs from '/source/scripts/storage.js';
import * as fetcherFuncs from '/source/scripts/fetcher.js';
import fetchedData from '/source/scripts/sampleRecipes.js';
// import * as fetchedData from '/sampleRecipes.json' assert {type: "json"};



// Variable declarations
let router;
let landingPage;
let explorePage;
let savedRecipePage;
let searchResults;
let recipeInfoPage;

router = new Router(() => {
	landingPage.classList.remove('hidden');
	//explorePage.classList.add('hidden');
	//savedRecipePage.classList.add('hidden');
	//searchResults.classList.add('hidden');

	// add "shown" to section wrapper for recipe cards:
	document.querySelector('section.section--recipe-cards').classList.remove("hidden");

	// recipeInfoPage.classList.add('hidden');
	document.querySelector('section.section--recipe-expand').classList.add('hidden')

});

window.addEventListener('DOMContentLoaded', init);

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
  //explorePage = document.querySelector('.explore');
  //savedRecipePage = document.querySelector('.saved-recipes');
  //searchResults = document.querySelector('.search-results');
  //recipeInfoPage = document.querySelector('.recipe-info');
  

  // Function calls
  // Fetch recipes and store locally if storage is empty.
  let storageCategoryData = fetcherFuncs.getAllCategoryRecipe();
	// console.log("storageCategoryData: ");
	// console.log(storageCategoryData);

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
	// console.log("After createExploreRecipeCards()");
  
  const storageSavedData = fetcherFuncs.getAllSavedRecipe();
	console.log("After storageSavedData fetcherFuncs");
	bindPopstate();
	bindEscKey();
}

/**
 * Generates the <recipe-card> elements from fetched recipes and appends them to page
 * @param storageCategoryData a JSON Object {category: RecipeJSON, ...}
 */
function createExploreRecipeCards(storageCategoryData) {
	// get explore-section "wrapper" (for "Trending Recipes"):
	let expSecEl = document.querySelector("explore-rec-section");

	// console.log("storageCategoryData:");
	// console.log(storageCategoryData);
	
	// create recipe cards (i.e., for each recipe, create card):
  Object.keys(storageCategoryData).forEach((category) => {
		let currCatRecIDs = Object.keys(category); // ids of current category

		// console.log("currCatRecIDs:");
		// console.log(currCatRecIDs);
		
		// for each recipe of current category ("breakfast", "lunch", etc.):
		for (let recId of currCatRecIDs) {
			let recipeCard = document.createElement('recipe-card');

			// console.log("recId:");
			// console.log(recId);
			
			// set recipeCard data for html element:
			// console.log('localStorage:');
			// console.log(localStorage);
			// console.log("localStorage['recipeData'][recId]):");
			// console.log(localStorage['recipeData'][recId]);
			
			// console.log("storageCategoryData[category][recId]:");
			// console.log(storageCategoryData[category][recId]);
			
			// set from passed-iin storageCategoryData:
			recipeCard.data = storageCategoryData[category][recId];

			// recipeCard.data = localStorage['recipeData'][recId]; // assumes recipe is already in local storage:

			// use # + recipe ids as page names for (expanded) recipes
			recId = storageCategoryData[category][recId]["id"]; // set to ID of recipe
			const page = '#' + recId; 
			console.log("page adding:");
			console.log(page);
			// adds function for going from: recipe card => expanded recipe card page
			router.addPage(page, () => {
				// assume 'hidden' performs opposite of 'shown' from lab 7:
				console.log("curr page() called by router.");
				// console.log("test retrieving section--recipe-cards element:");
				// console.log(document.querySelector('section.section--recipe-cards'));
				document.querySelector('section.landing').classList.add("hidden");
				document.querySelector('section.section--recipe-cards').classList.add('hidden');
				document.querySelector('section.section--recipe-expand').classList.remove('hidden');
				document.querySelector('recipe-expand').data = recipeCard.data;
				
			});
			// binds recipeCard for clicking to go to expanded page
			prepRecipeForClick(recipeCard, page);

			// add to html: append to explore section element custom element: 
			// expSecEl.appendChild(recipeCard);
			// test recipe cards not showing:
			let recCardWrapperEl = document.querySelector("div.recipe-cards--wrapper");
			recCardWrapperEl.appendChild(recipeCard);
			// **Note: so when I do expSecEl.appendChild(recipeCard);, of appending
			// the recipe cards to a custom html element also, then they won't show/appear
			// on the webpage, even though their html is there; appending them
			// to a "standard" html element (here, "div") seems to enable them both
			// to have their html there but also appear visualyl on the page.


			// document.querySelector('recipe-cards--wrapper').appendChild(recipeCard);
		}
  })   
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
 * Binds the 'popstate' event on the window (which fires when the back &
 * forward buttons are pressed) so the navigation will continue to work 
 * as expected. (Hint - you should be passing in which page you are on
 * in your Router when you push your state so you can access that page
 * info in your popstate function)
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
	console.log("");
	console.log("*****************");
	console.log("In event listener for popstate.");
	console.log("event for event fired: ");
	console.log(event);
	console.log("Current state: ");
	console.log(event.state);

	if(event.state != undefined) // && event.state["pageHash"] != "home") 
	{
		console.log("State of event fired for popstate: " + event.state["pageHash"]);
		if(event.state["pageHash"] == "") // navigate to home:
		{
			router.navigate("home", true);
		} else {

			//router.navigate(event.state["pageHash"].slice(1), true); // to get rid of hash, #, at start of name, slice from index 1 to end of string
																															// (also note we don't explicitly add home to history stack, so going
																														 // to home only happens in the else case here, of when event.state == null,
																															// so we'll never be passed just "home", of something without a # as its first
																															// character, in this if.
			// just added (for project), see if it works:
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
      router.navigate("home", false); // is this true or false for statePopped (2nd arg)???
    }
  })
}

// get router:
export default function getRouter() {
	return router;
}