/* eslint-disable eqeqeq */
/* eslint-disable dot-notation */
/* eslint-disable no-plusplus */
// localStorage = {
//   categories: { // Used to populate explore page (only ids to reduce storage size)
//       "breakfast": [
//           "123", // recipe id
//           "111", // recipe id
//           "444", // recipe id
//       ],
//       "lunch": [
//           "123", // recipe id
//           "111", // recipe id
//           "444", // recipe id
//       ],
//   },
//   savedRecipes: { // Saved recipe page categories (only ids to reduce storage size)
//       "favorites": [
//           "123", // recipe id
//           "111", // recipe id
//           "444", // recipe id
//       ],
//       "list2": [
//           "123", // recipe id
//           "111", // recipe id
//           "444", // recipe id
//       ],
//   },
//   recipeData: { // Complete storage of available recipes we can query without fetching
//       "111": "full recipe json object", // these are api results so we never have to modify them
//       "123": "full recipe json object",
//       "444": "full recipe json object",
//       "555": "full recipe json object",
//       "715": "full recipe json object",
//       "892": "full recipe json object"
//   }
// }

/**
 *
 * @param {*} category
 * @param {*} recipeArray
 */
export function storeRecipeData(category, recipeArray) {
  try {
    let allData = JSON.parse(localStorage.getItem("recipeData"));
    if (allData == null) {
      allData = {};
    }

    // store recipe
    const allRecipeId = [];
    for (let i = 0; i < recipeArray.length; i++) {
      const uid = recipeArray[i]["id"];
      allRecipeId.push(uid);
      allData[uid] = recipeArray[i];
    }

    // add to category list
    let catData = JSON.parse(localStorage.getItem("categories"));
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

    localStorage.setItem("categories", JSON.stringify(catData));
    localStorage.setItem("recipeData", JSON.stringify(allData));
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
    let listData = JSON.parse(localStorage.getItem("savedLists"));

    if (listData == null) {
      listData = {};
    }

    if (!(listName in listData)) {
      listData[listName] = [];
    }

    if (!listData[listName].includes(recipeId)) {
      listData[listName].push(recipeId);
    }

    localStorage.setItem("savedLists", JSON.stringify(listData));
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
    const listData = JSON.parse(localStorage.getItem("savedLists"));
    if (listData != null && listName in listData) {
      listData[listName] = listData[listName].filter((id) => id != recipeId);
      localStorage.setItem("savedLists", JSON.stringify(listData));
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * if list already exist, do nothing. else create list in savedLists
 * @param {*} listName
 */
export function createList(listName) {
  try {
    let listData = JSON.parse(localStorage.getItem("savedLists"));
    if (listData == null) {
      listData = {};
      listData[listName] = [];
      localStorage.setItem("savedLists", JSON.stringify(listData));
    } else if (!(listName in listData)) {
      // if (!(listName in listData)) {
      listData[listName] = [];
      localStorage.setItem("savedLists", JSON.stringify(listData));
      // }
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * delete all the stored info of the list.
 * @param {*} listName
 */
export function deleteList(listName) {
  try {
    const listData = JSON.parse(localStorage.getItem("savedLists"));
    if (listData != null && listName in listData) {
      delete listData[listName];
      localStorage.setItem("savedLists", JSON.stringify(listData));
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * delete created recipe
 * @param {*} recipeId
 */
export function deleteCreatedRecipe(recipeId) {
  try {
    const saveData = JSON.parse(localStorage.getItem("savedLists"));
    const catData = JSON.parse(localStorage.getItem("categories"));
    const allData = JSON.parse(localStorage.getItem("recipeData"));

    if (
      saveData &&
      "created" in saveData &&
      saveData["created"].includes(recipeId)
    ) {
      saveData["created"] = saveData["created"].filter((id) => id != recipeId);
      catData["created"] = catData["created"].filter((id) => id != recipeId);
      delete allData[recipeId];

      localStorage.setItem("categories", JSON.stringify(catData));
      localStorage.setItem("recipeData", JSON.stringify(allData));
      localStorage.setItem("savedLists", JSON.stringify(saveData));

    }

  } catch (e) {
    console.error(e);
  }
}
