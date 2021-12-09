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
import { setRecipeData } from '../source/scripts/storage/storage.js';

// set mock local storage so api functions wont break
setRecipeData('{}');

// getDetailedRecipeInfoBulk
test('check getDetailedRecipeInfoBulk with empty list input', () => helpers.getDetailedRecipeInfoBulk([]).then((data) => {
  expect(data).toEqual([]);
}));
test('check getDetailedRecipeInfoBulk with ids', () => helpers.getDetailedRecipeInfoBulk([547775, 547899]).then((data) => {
  expect(data.length).toBe(2);
}));
test('check getDetailedRecipeInfoBulk with ids', () => helpers.getDetailedRecipeInfoBulk([547775, 547899]).then((data) => {
  expect(data.length).toBe(2);
}));
test('check getDetailedRecipeInfoBulk with ids', () => helpers.getDetailedRecipeInfoBulk([123456, 654321, 145682, 423784]).then((data) => {
  expect(data.length).toBe(4);
}));
test('check getDetailedRecipeInfoBulk with ids', () => helpers.getDetailedRecipeInfoBulk([123456, 654321, 145682, 423784, 54894, 54955]).then((data) => {
  expect(data.length).toBe(6);
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

test('Check getRecipesByName with filtering options', () => {
  const filter = {};
  filter.sort = 'popularity';
  filter.sortDirection = 'asc';
  filter.diet = 'Vegan';
  filter.cuisine = 'Italian';
  return helpers.getRecipesByName('pizza', 1, 0, filter).then((data) => {
    const recipe = data[0];
    expect(recipe.Vegan).toBe(true);
    expect(recipe.cuisines.includes('Italian')).toBe(true);
    expect(recipe.veryPopular).toBe(true);
  });
});

test('Check getRecipesByName with filtering options', () => {
  const filter = {};
  filter.sort = 'popularity';
  filter.sortDirection = 'asc';
  filter.diet = 'Vegan';
  filter.cuisine = 'Italian';
  return helpers.getRecipesByName('Pasta', 1, 0, filter).then((data) => {
    const recipe = data[0];
    expect(recipe.Vegan).toBe(true);
    expect(recipe.cuisines.includes('Italian')).toBe(true);
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

test('Check that extractIDs is checking for local storage', () => {
  const dummyRecipeData = { 658451: 'mydummy1' };
  setRecipeData(dummyRecipeData);
  //console.log(getAllRecipes);
  const dummyComplexSearch = { results: [{ id: 658451 }, { id: 6548 }] };
  const ids = helpers.extractIDs(dummyComplexSearch);
  expect(ids[0]).toEqual([6548]);
  expect(ids[1]).toEqual(['mydummy1']);
});

test('Check that extractIDs is checking for local storage', () => {
  const dummyRecipeData = { 111111: '111111' };
  setRecipeData(dummyRecipeData);
  //console.log(getAllRecipes);
  const dummyComplexSearch = { results: [{ id: 53465 }, { id: 111111 }, { id: 2222 }] };
  const ids = helpers.extractIDs(dummyComplexSearch);
  expect(ids[0]).toEqual([2222]);
  expect(ids[1]).toEqual(['111111']);
  expect(ids[2]).toEqual([53465]);
});

// getRecipesByCuisine
test('Check getRecipesByCuisine Mexican returns mexican dishes', () => helpers.getRecipesByCuisine('mexican', 1).then((data) => {
  expect(data[0].cuisines.includes('Mexican')).toBe(true);
}));
test('Check getRecipesByCuisine Mexican returns mexican dishes', () => helpers.getRecipesByCuisine('mexican', 1).then((data) => {
  expect(data[0].cuisines.includes('pizza')).toBe(false);
}));

// getRecipesByType
test('Check getRecipesByType breakfast returns breakfast dishes', () => helpers.getRecipesByType('breakfast', 1).then((data) => {
  expect(data[0].dishTypes.includes('breakfast')).toBe(true);
}));
test('Check getRecipesByType breakfast returns breakfast dishes', () => helpers.getRecipesByType('breakfast', 1).then((data) => {
  expect(data[0].dishTypes.includes('lunch')).toBe(false);
}));
