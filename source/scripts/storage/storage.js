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
      localStorage.setItem(
        recipeArray[i]["title"],
        JSON.stringify(recipeArray[i])
      );
    }

    let allRecipeName = recipeArray.map((recipe) => recipe["title"]);
    // add to category list
    let catData = JSON.parse(localStorage.getItem("categories"));
    if (catData == null) {
      catData = {};
      catData[category] = allRecipeName;
      localStorage.setItem("categories", JSON.stringify(catData));
    } else {
      if (category in catData) {
        allRecipeName.forEach((Rname)=>{
          if(!(catData[category].includes(Rname))){
            catData[category].push(Rname)
          }
        })
      } else {
        catData[category] = allRecipeName;
      }
      localStorage.setItem("categories", JSON.stringify(catData));
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
    let listData = JSON.parse(localStorage.getItem("savedLists"));
    if (listData == null) {
      listData = {};
      listData[listName] = [recipeName];
      localStorage.setItem("savedLists", JSON.stringify(listData));
    } else {
      if (listName in listData) {
        if (!listData[listName].includes(recipeName)) {
          listData[listName].push(recipeName);
          localStorage.setItem("savedLists", JSON.stringify(listData));
        }
      } else {
        listData[listName] = [recipeName];
        localStorage.setItem("savedLists", JSON.stringify(listData));
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
    let listData = JSON.parse(localStorage.getItem("savedLists"));
    if (listData != null && listName in listData) {
      listData[listName] = listData[listName].filter(
        (name) => name != recipeName
      );
      localStorage.setItem("savedLists", JSON.stringify(listData));
    }
  } catch (e) {
    console.error(e);
  }
}

// if list already exist, do nothing. else create list in savedLists
// input: list name to create.
export function createList(listName) {
  try {
    let listData = JSON.parse(localStorage.getItem("savedLists"));
    if (listData == null) {
      localStorage.setItem("savedLists", JSON.stringify({ listName: [] }));
    } else {
      if (!(listName in listData)) {
        listData[listName] = [];
        localStorage.setItem("savedLists", JSON.stringify(listData));
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
    let listData = JSON.parse(localStorage.getItem("savedLists"));
    if (listData != null && listName in listData) {
      delete listData[listName];
      localStorage.setItem("savedLists", JSON.stringify(listData));
    }
  } catch (e) {
    console.error(e);
  }
}
