


import * as helpers from '../source/scripts/apiHelpers.js';

// set mock local storage so api functions wont break
localStorage.setItem('recipeData', '{}');

// getDetailedRecipeInfoBulk
test('check getDetailedRecipeInfoBulk with empty list input', () => helpers.getDetailedRecipeInfoBulk([]).then((data) => {
  expect(data).toEqual([]);
}));
test('check getDetailedRecipeInfoBulk with ids', () => helpers.getDetailedRecipeInfoBulk([547775, 547899]).then((data) => {
  expect(data.length).toBe(2);
}));

// getRecipesByName filtering
test('Check getRecipesByName with filtering options', () => {
  const filter = {};
  filter.sort = 'popularity';
  filter.sortDirection = 'desc';
  filter.diet = 'vegetarian';
  filter.cuisine = 'mexican';
  return helpers.getRecipesByName('rice', 1, 0, filter).then((data) => {
    const recipe = data[0];
    console.log(recipe.vegetarian, recipe.cuisines, recipe.veryPopular);
    expect(recipe.vegetarian).toBe(true);
    expect(recipe.cuisines.includes('Mexican')).toBe(true);
    expect(recipe.veryPopular).toBe(true);
  });
});

// getRecipesByCuisine
test('Check getRecipesByCuisine Mexican returns mexican dishes', () => helpers.getRecipesByCuisine('mexican', 1).then((data) => {
  expect(data[0].cuisines.includes('Mexican')).toBe(true);
}));
// getRecipesByType
test('Check getRecipesByType breakfast returns breakfast dishes', () => helpers.getRecipesByType('breakfast', 1).then((data) => {
  expect(data[0].dishTypes.includes('breakfast')).toBe(true);
}));
