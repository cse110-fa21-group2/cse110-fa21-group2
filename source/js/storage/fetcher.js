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
 * @return recipe id in categories {category1:[recipe ids],category2:[recipe ids]}
 */
export function getAllCategoryRecipeId() {
  return JSON.parse(localStorage.getItem('explore-categories'));
}

/**
 * Gets all recipes sorted by categories where key=category and value=recipeJSON
 * @return Object recipe in categories {category1:[recipe json],category2:[recipe json]}
 */
export function getAllCategoryRecipe() {
  const categoryId = getAllCategoryRecipeId();
  // eslint-disable-next-line no-use-before-define
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
 * @returns recipe id in saved lists {list1:[recipe ids],list2:[recipe ids]}
 */
export function getAllSavedRecipeId() {
  return JSON.parse(localStorage.getItem('savedLists'));
}

/**
 *
 * @returns recipe in saved lists {list1:[recipe json],list2:[recipe json]}
 */
export function getAllSavedRecipe() {
  const savedId = getAllSavedRecipeId();
  // eslint-disable-next-line no-use-before-define
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

/**
 *
 * @returns all recipes {uid:recipe json,uid:recipe json}
 */
export function getAllRecipes() {
  return JSON.parse(localStorage.getItem('recipeData'));
}

/**
 *
 * @param {*} recipeid
 * @returns json object of the recipe
 */
export function getSingleRecipe(recipeid) {
  const recipes = getAllRecipes();
  return recipes[recipeid];
}
