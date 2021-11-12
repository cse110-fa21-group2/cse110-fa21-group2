//storage {
//   categories: {cat1:[names],cat2:[names]}
//   savedLists: {list1:[names],list2:[names]}
//   recipeName1: json object
//   recipeName2: json object
// }

// return recipe name in categories
// input: none
// output: {category1:[recipe names],category2:[recipe names]}
export function getCategoryRecipes() {
  return localStorage.getItem("categories");
}

// return recipe name in saved lists
// input: none
// output: {category1:[recipe names],category2:[recipe names]}
export function getSavedRecipes() {
  return localStorage.getItem("savedLists");
}

// return a specific json object from recipe name
// input: none
// output: {category1:[recipe names],category2:[recipe names]}
export function getRecipe(recipeName) {
  return localStorage.getItem(recipeName);
}
