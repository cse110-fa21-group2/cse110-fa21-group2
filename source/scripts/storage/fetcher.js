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
 * @returns recipe id in categories {category1:[recipe ids],category2:[recipe ids]}
 */
export function getCategoryRecipes() {
  return JSON.parse(localStorage.getItem("categories"));
}

/**
 *
 * @returns recipe id in saved lists {category1:[recipe ids],category2:[recipe ids]}
 */
export function getSavedRecipes() {
  return JSON.parse(localStorage.getItem("savedLists"));
}

/**
 *
 * @returns all recipes {uid:recipe json,uid:recipe json}
 */
export function getAllRecipes() {
  return JSON.parse(localStorage.getItem("recipeData"));
}
