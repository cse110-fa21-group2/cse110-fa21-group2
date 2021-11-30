/* eslint-disable no-plusplus */
// main.js

// Import requried modules
import * as storageFuncs from "../js/storage/storage.js";
import * as fetcherFuncs from "../js/storage/fetcher.js";
import {returnDummyData} from "./exampleData.js"

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
  console.log("in deleteUpdate.js");

  const tempData = returnDummyData();
  tempData[0].id = "new recipe"
  //storageFuncs.storeRecipeData("test", tempData);
  let main = document.querySelector('main');
  let temp = document.createElement("section");
  temp.classList.add("temp");
  main.appendChild(temp)  
  for (let i = 0 ; i < tempData.length / 2; i++){
    let recipeCardTemp = document.createElement("recipe-card");
    // recipeCardTemp.setAttribute('id',tempData[i].id);
    recipeCardTemp.id = tempData[i].id
    recipeCardTemp.data = tempData[i];
    temp.appendChild(recipeCardTemp);
  }
}
window.addEventListener("DOMContentLoaded", init);
