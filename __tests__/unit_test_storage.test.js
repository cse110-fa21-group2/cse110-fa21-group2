/**
 * @jest-environment jsdom
 */

const storageFuncs = require('../source/scripts/storage/storage');
// eslint-disable-next-line no-undef
test('test setRecipeData', async () => {
  window.localStorage.clear();
  const data = { id: '1234' };
  storageFuncs.setRecipeData(data);
  const result = JSON.parse(localStorage.getItem('recipeData'));
  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(data);
});

// eslint-disable-next-line no-undef
test('test getSavedLists', async () => {
  window.localStorage.clear();
  const data = { list1: [1, 2, 3] };
  localStorage.setItem('savedLists', JSON.stringify(data));
  const result = storageFuncs.getSavedLists();
  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(data);
});

// eslint-disable-next-line no-undef
test('test saveRecipeData', async () => {
  window.localStorage.clear();
  const data = { id: '12345', title: 'testTitle' };
  const expected = { 12345: data };
  storageFuncs.saveRecipeData(data);

  const result = JSON.parse(localStorage.getItem('recipeData'));
  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expected);
});

// eslint-disable-next-line no-undef
test('test storeRecipeData', async () => {
  window.localStorage.clear();
  const data = [{ id: '12345', title: 'testTitle' }];
  const expectedCatData = { somecat: ['12345'] };
  const expectedRecipeData = { 12345: data[0] };
  storageFuncs.storeRecipeData('somecat', data);

  const catDataResult = JSON.parse(localStorage.getItem('explore-categories'));
  const recipeDataResult = JSON.parse(localStorage.getItem('recipeData'));

  console.log(catDataResult);
  console.log(recipeDataResult);
  // eslint-disable-next-line no-undef
  expect(catDataResult).toStrictEqual(expectedCatData);
  // eslint-disable-next-line no-undef
  expect(recipeDataResult).toStrictEqual(expectedRecipeData);
});

// eslint-disable-next-line no-undef
test('test saveRecipeToList', async () => {
  window.localStorage.clear();
  const expectedData = { somelist: ['12345'] };
  storageFuncs.saveRecipeToList('somelist', '12345');

  const result = JSON.parse(localStorage.getItem('savedLists'));

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});

// eslint-disable-next-line no-undef
test('test createKey', async () => {
  window.localStorage.clear();
  const expectedData = {};
  storageFuncs.createKey('somelist');

  const result = JSON.parse(localStorage.getItem('somelist'));

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});

// eslint-disable-next-line no-undef
test('test deleteCreatedRecipe', async () => {
  window.localStorage.clear();
  const data = { id: '12345', title: 'rec' };
  const expectedData = { created: [] };

  storageFuncs.storeRecipeData('created', [data]);
  storageFuncs.saveRecipeToList('created', data.id);
  storageFuncs.createList('favorites');

  storageFuncs.deleteCreatedRecipe(data.id);

  const result = JSON.parse(localStorage.getItem('explore-categories'));

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});
