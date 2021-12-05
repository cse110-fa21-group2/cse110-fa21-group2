import * as fetcherFuncs from './fetcher.js';

export function setRecipeData(data) {
  localStorage.setItem('recipeData', JSON.stringify(data));
}

export function getSavedLists() {
  return JSON.parse(localStorage.getItem('savedLists'));
}

/**
 * Given the JSON for a single recipe, save it in recipeData list in localStorage
 * @param {*} data
 */
export function saveRecipeData(data) {
  const { id } = data;
  let recipeData = fetcherFuncs.getAllRecipes();
  if (recipeData === null) {
    recipeData = {};
  }
  if (!recipeData[id]) {
    recipeData[id] = data;
  }
  setRecipeData(recipeData);
}

/**
 *
 * @param {*} category
 * @param {*} recipeArray
 */
export function storeRecipeData(category, recipeArray) {
  try {
    let allData = JSON.parse(localStorage.getItem('recipeData'));
    if (allData == null) {
      allData = {};
    }

    // store recipe
    const allRecipeId = [];
    for (let i = 0; i < recipeArray.length; i += 1) {
      const uid = recipeArray[i].id;
      allRecipeId.push(uid);
      allData[uid] = recipeArray[i];
    }

    // add to category list
    let catData = JSON.parse(localStorage.getItem('explore-categories'));
    if (catData == null) {
      catData = {};
    }
    if (!(category in catData)) {
      catData[category] = [];
    }

    allRecipeId.forEach((rid) => {
      if (!catData[category].includes(rid)) {
        catData[category].push(rid);
      }
    });

    localStorage.setItem('explore-categories', JSON.stringify(catData));
    localStorage.setItem('recipeData', JSON.stringify(allData));
  } catch (e) {
    // storage might be full
    console.log(e);
  }
}

/**
 * save recipe to a list(add recipeId to savedlist)
 * @param {*} listName
 * @param {*} recipeId
 */
export function saveRecipeToList(listName, recipeId) {
  try {
    let listData = JSON.parse(localStorage.getItem('savedLists'));

    if (listData == null) {
      listData = {};
    }

    if (!(listName in listData)) {
      listData[listName] = [];
    }

    if (!listData[listName].includes(recipeId)) {
      listData[listName].push(recipeId);
    }

    localStorage.setItem('savedLists', JSON.stringify(listData));
  } catch (e) {
    console.error(e);
  }
}

/**
 * remove recipe in a list (remove recipeId from savedlist)
 * @param {*} listName
 * @param {*} recipeId
 */
export function removeRecipeFromList(listName, recipeId) {
  try {
    const listData = JSON.parse(localStorage.getItem('savedLists'));
    if (listData != null && listName in listData) {
      listData[listName] = listData[listName].filter((id) => id !== recipeId);
      localStorage.setItem('savedLists', JSON.stringify(listData));
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * Add key to localStorage if not currently there
 * @param {String} key to add to localStorage
 */
export function createKey(key) {
  if (!window.localStorage.getItem(key)) {
    window.localStorage.setItem(key, JSON.stringify({}));
  }
}

/**
 * if list already exist, do nothing. else create list in savedLists
 * @param {*} listName
 */
export function createList(listName) {
  // Initialize key in case it doesn't exist
  createKey('savedLists');
  // Get JSON object of lists
  const lists = JSON.parse(localStorage.getItem('savedLists'));
  // Initialize value to blank if missing
  if (!lists[listName]) {
    lists[listName] = [];
  }
  // Put back in localStorage
  localStorage.setItem('savedLists', JSON.stringify(lists));
}

/**
 * delete created recipe
 * @param {*} recipeId
 */
export function deleteCreatedRecipe(recipeId) {
  try {
    const saveData = JSON.parse(localStorage.getItem('savedLists'));
    const catData = JSON.parse(localStorage.getItem('explore-categories'));
    const allData = JSON.parse(localStorage.getItem('recipeData'));

    if (saveData && 'created' in saveData && saveData.created.includes(recipeId)) {
      saveData.created = saveData.created.filter((id) => id !== recipeId);
      saveData.favorites = saveData.favorites.filter((id) => id !== recipeId);
      catData.created = catData.created.filter((id) => id !== recipeId);
      delete allData[recipeId];

      localStorage.setItem('explore-categories', JSON.stringify(catData));
      localStorage.setItem('recipeData', JSON.stringify(allData));
      localStorage.setItem('savedLists', JSON.stringify(saveData));
    }
  } catch (e) {
    console.error(e);
  }
}
