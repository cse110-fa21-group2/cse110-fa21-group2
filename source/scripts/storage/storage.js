//storage {
//   categories: {cat1:[names],cat2:[names]}
//   savedLists: {list1:[names],list2:[names]}
//   recipeName1: json object
//   recipeName2: json object
// }

// store recipe to local storage
// add recipe name to category 
// input: category of api fetch, array of recipe json object
export function storeRecipeData(category, recipeArray) {
  try {
    // store recipe
    for (let i = 0; i < recipeArray.length; i++) {
      localStorage.setItem(recipeArray[i]["title"], recipeArray[i]);
    }

    let allRecipeName = recipeArray.map((recipe) => recipe["title"]);
    // add to category list
    let catData = localStorage.getItem("categories");
    if (catData == null) {
      localStorage.setItem("categories", { category: allRecipeName });
    } else {
      if (category in catData) {
        catData[category] = catData[category].concat(allRecipeName);
      } else {
        catData[category] = allRecipeName;
      }
      localStorage.setItem("categories", catData);
    }
  } catch (e) {
    // storage might be full
    console.log(e);
  }
}

// save recipe to a list(add recipeName to savedlist)
// input: list name to store recipe to, edited recipeObject
export function saveRecipeToList(listName, recipeName) {
  try {
    let listData = localStorage.getItem("savedLists");
    if (listData == null) {
      localStorage.setItem("savedLists", { listName: [recipeName] });
    } else {
      if (listName in listData) {
        listData[listName].push(recipeName);
        localStorage.setItem("savedLists", listData);
      } else {
        listData[listName] = [recipeName];
        localStorage.setItem("savedLists", listData);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

// remove recipe in a list (remove recipename from savedlist)
// input: list name to store recipe to, edited recipeObject
export function removeRecipeFromList(listName, recipeName) {
  try {
    let listData = localStorage.getItem("savedLists");
    if (listData != null && listName in listData) {
      listData[listName] = listData[listName].filter(
        (name) => name != recipeName
      );
      localStorage.setItem("savedLists", listData);
    }
  } catch (e) {
    console.error(e);
  }
}

// if list already exist, do nothing. else create list in savedLists
// input: list name to create.
export function createList(listName) {
  try {
    let listData = localStorage.getItem("savedLists");
    if (listData == null) {
      localStorage.setItem("savedLists", { listName: [] });
    } else {
      if (!(listName in listData)) {
        listData[listName] = [];
        localStorage.setItem("savedLists", listData);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

// delete all the stored info of the list.
// input: list name to delete.
export function deleteList(listName) {
  try {
    let listData = localStorage.getItem("savedLists");
    if (listData != null && listName in listData) {
      delete listData[listName];
      localStorage.setItem("savedLists", listData);
    }
  } catch (e) {
    console.error(e);
  }
}
