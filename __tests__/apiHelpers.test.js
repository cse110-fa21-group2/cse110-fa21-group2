import * as helpers from '../source/scripts/apiHelpers.js'; // import doesnt work 

// havent acutally tried running anything yet(idk if they work at all)

// getDetailedRecipeInfoBulk
test('check getDetailedRecipeInfoBulk with empty list input', () => helpers.getDetailedRecipeInfoBulk([]).then((data) => {
  expect(data).toBe([]);
}));

test('check getDetailedRecipeInfoBulk with ids', () => helpers.getDetailedRecipeInfoBulk([547775, 547899]).then((data) => {
  expect(data.length).toBe(2);
}));

// getRecipesByName filtering
test('Check getRecipesByName with filtering options', () => {
  const filter = {};
  filter.sort = 'popularity';
  filter.sortDirection = 'desc';
  filter.diet = 'vegitarian';
  filter.cuisine = 'mexican';
  return helpers.getRecipesByName('rice', 1, 0, filter).then((data) => {
    const recipe = data[0];
    expect(recipe.vegetarian).toBe(true);
    expect('Mexican' in recipe.cuisines).toBe(true);
    expect(recipe.veryPopular).toBe(true);
  });
});

// getRecipesByCuisine
test('Check getRecipesByCuisine Mexican returns mexican dishes', () => helpers.getRecipesByCuisine('mexican', 1).then((data) => {
  expect('Mexican' in data[0].cuisines).toBe(true);
}));
// getRecipesByType
test('Check getRecipesByType breakfast returns breakfast dishes', () => helpers.getRecipesByType('breakfast', 1).then((data) => {
  expect('breakfast' in data[0].dishTypes).toBe(true);
}));
