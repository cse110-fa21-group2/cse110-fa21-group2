/**
 *
 * @returns {Object} all recipes {uid:recipe json,uid:recipe json}
 */
export function getAllRecipes() {
  return JSON.parse(localStorage.getItem('recipeData'));
}

/**
 *
 * @param {*} recipeid
 * @returns {Object} object of the recipe
 */
export function getSingleRecipe(recipeid) {
  const recipes = getAllRecipes();
  return recipes[recipeid];
}

/**
 *
 * @return {Object} recipe id in categories {category1:[recipe ids],category2:[recipe ids]}
 */
export function getAllCategoryRecipeId() {
  return JSON.parse(localStorage.getItem('explore-categories'));
}

/**
 * Gets all recipes sorted by categories where key=category and value=recipeJSON
 * @return {Object} Object recipe in categories {category1:[recipe json],category2:[recipe json]}
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
 * @returns {Object} recipe id in saved lists {list1:[recipe ids],list2:[recipe ids]}
 */
export function getAllSavedRecipeId() {
  return JSON.parse(localStorage.getItem('savedLists'));
}

/**
 *
 * @returns {Object} recipe in saved lists {list1:[recipe json],list2:[recipe json]}
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
