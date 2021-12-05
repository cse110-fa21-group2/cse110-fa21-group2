/**
 * @jest-environment jsdom
 */
const storageFuncs = require('../source/scripts/storage/storage');
const fetcherFuncs = require('../source/scripts/storage/fetcher');

// eslint-disable-next-line no-undef
test('test getAllRecipes', async () => {
  window.localStorage.clear();
  const data1 = { id: '12345', title: 'rec' };
  const data2 = { id: '54321', title: 'rec' };

  const expectedData = { 12345: data1, 54321: data2 };

  storageFuncs.storeRecipeData('test', [data1, data2]);
  storageFuncs.saveRecipeToList('favorites', data1.id);
  storageFuncs.saveRecipeToList('favorites', data2.id);

  const result = fetcherFuncs.getAllRecipes();

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});

// eslint-disable-next-line no-undef
test('test getSingleRecipe', async () => {
  window.localStorage.clear();
  const data1 = { id: '12345', title: 'rec' };
  const data2 = { id: '54321', title: 'rec' };

  const expectedData = data1;

  storageFuncs.storeRecipeData('test', [data1, data2]);
  storageFuncs.saveRecipeToList('favorites', data1.id);
  storageFuncs.saveRecipeToList('favorites', data2.id);

  const result = fetcherFuncs.getSingleRecipe('12345');

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});

// eslint-disable-next-line no-undef
test('test getAllCategoryRecipeId', async () => {
  window.localStorage.clear();
  const data1 = { id: '12345', title: 'rec' };
  const data2 = { id: '54321', title: 'rec' };

  const expectedData = { test: [data1.id, data2.id] };

  storageFuncs.storeRecipeData('test', [data1, data2]);
  storageFuncs.saveRecipeToList('favorites', data1.id);
  storageFuncs.saveRecipeToList('favorites', data2.id);

  const result = fetcherFuncs.getAllCategoryRecipeId();

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});

// eslint-disable-next-line no-undef
test('test getAllCategoryRecipe', async () => {
  window.localStorage.clear();
  const data1 = { id: '12345', title: 'rec' };
  const data2 = { id: '54321', title: 'rec' };

  const expectedData = { test: [data1, data2] };

  storageFuncs.storeRecipeData('test', [data1, data2]);
  storageFuncs.saveRecipeToList('favorites', data1.id);
  storageFuncs.saveRecipeToList('favorites', data2.id);

  const result = fetcherFuncs.getAllCategoryRecipe();

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});

// eslint-disable-next-line no-undef
test('test getAllSavedRecipeId', async () => {
  window.localStorage.clear();
  const data1 = { id: '12345', title: 'rec' };
  const data2 = { id: '54321', title: 'rec' };

  const expectedData = { favorites: [data1.id, data2.id] };

  storageFuncs.storeRecipeData('test', [data1, data2]);
  storageFuncs.saveRecipeToList('favorites', data1.id);
  storageFuncs.saveRecipeToList('favorites', data2.id);

  const result = fetcherFuncs.getAllSavedRecipeId();

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});

// eslint-disable-next-line no-undef
test('test getAllSavedRecipe', async () => {
  window.localStorage.clear();
  const data1 = { id: '12345', title: 'rec' };
  const data2 = { id: '54321', title: 'rec' };

  const expectedData = { favorites: [data1, data2] };

  storageFuncs.storeRecipeData('test', [data1, data2]);
  storageFuncs.saveRecipeToList('favorites', data1.id);
  storageFuncs.saveRecipeToList('favorites', data2.id);

  const result = fetcherFuncs.getAllSavedRecipe();

  console.log(result);
  // eslint-disable-next-line no-undef
  expect(result).toStrictEqual(expectedData);
});
