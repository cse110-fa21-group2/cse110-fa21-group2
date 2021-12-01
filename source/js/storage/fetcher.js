// localStorage = {
//   explore-categories: { // Used to populate explore page (only ids to reduce storage size)
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
//       "created": [
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
 * @returns {uid:recipe json,uid:recipe json} all recipes
 */
export function getAllRecipes() {
  return JSON.parse(localStorage.getItem('recipeData'));
}

/**
 *
 * @param {*} recipeid
 * @returns {json} object of the recipe
 */
export function getSingleRecipe(recipeid) {
  const recipes = getAllRecipes();
  return recipes[recipeid];
}

/**
 *
 * @return {category1:[recipe ids],category2:[recipe ids]} recipe id in categories
 */
export function getAllCategoryRecipeId() {
  return JSON.parse(localStorage.getItem('explore-categories'));
}

/**
 * Gets all recipes sorted by categories where key=category and value=recipeJSON
 * @return {category1:[recipe json],category2:[recipe json]} Object recipe in categories
 */
export function getAllCategoryRecipe() {
  const categoryId = getAllCategoryRecipeId();
  const recipes = getAllRecipes();
  const output = {};
  if (categoryId == null || recipes == null) {
    return null;
  }
  Object.keys(categoryId).forEach((category) => {
    output[category] = [];
    categoryId[category].forEach((id) => {
      output[category].push(recipes[id]);
    });
  });
  return output;
}

/**
 *
 * @returns {list1:[recipe ids],list2:[recipe ids]} recipe id in saved lists
 */
export function getAllSavedRecipeId() {
  return JSON.parse(localStorage.getItem('savedLists'));
}

/**
 *
 * @returns {list1:[recipe json],list2:[recipe json]} recipe in saved lists
 */
export function getAllSavedRecipe() {
  const savedId = getAllSavedRecipeId();
  const recipes = getAllRecipes();
  const output = {};
  if (savedId == null || recipes == null) {
    return null;
  }
  Object.keys(savedId).forEach((category) => {
    output[category] = [];
    savedId[category].forEach((id) => {
      output[category].push(recipes[id]);
    });
  });
  return output;
}
