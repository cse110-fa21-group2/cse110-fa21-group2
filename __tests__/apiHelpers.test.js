/**
 * Unit test for API Helper functions.
 * Setup steps:
 *  npm i --save-dev jest-localstorage-mock // to mock local storage
 *  npm install node-fetch
 *  In apiHelpers.js, import fetch from 'node-fetch';
 * To Run:
 *  npm test apiHelpers.test.js
 */
import * as helpers from '../source/scripts/apiHelpers.js';
import { saveRecipeData, setRecipeData, storeRecipeData } from '../source/scripts/storage/storage.js';
import TEST_DATA from '../source/scripts/storage/sampleData.js';
import { getAllRecipes } from '../source/scripts/storage/fetcher.js';

// set mock local storage so api functions wont break
setRecipeData('{}');

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
    expect(recipe.vegetarian).toBe(true);
    expect(recipe.cuisines.includes('Mexican')).toBe(true);
    expect(recipe.veryPopular).toBe(true);
  });
});

// extractIDs
test('Check that extractIDs is checking for local storage', () => {
  const dummyRecipeData = { 776505: 'awoogabooga' };
  setRecipeData(dummyRecipeData);
  //console.log(getAllRecipes);
  const dummyComplexSearch = { results: [{ id: 776505 }, { id: 123 }] };
  const ids = helpers.extractIDs(dummyComplexSearch);
  expect(ids[0]).toEqual([123]);
  expect(ids[1]).toEqual(['awoogabooga']);
});

// getRecipesByCuisine
test('Check getRecipesByCuisine Mexican returns mexican dishes', () => helpers.getRecipesByCuisine('mexican', 1).then((data) => {
  expect(data[0].cuisines.includes('Mexican')).toBe(true);
}));
// getRecipesByType
test('Check getRecipesByType breakfast returns breakfast dishes', () => helpers.getRecipesByType('breakfast', 1).then((data) => {
  expect(data[0].dishTypes.includes('breakfast')).toBe(true);
}));
