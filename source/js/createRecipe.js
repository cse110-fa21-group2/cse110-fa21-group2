import * as storageFuncs from './storage/storage.js';
function init() {
  // add a ingredient input row to dom
  let addIngredientButton = document.querySelector(".add-ingredient-button");
  addIngredientButton.addEventListener("click", (e) => {
    let createIngRoot = document.querySelector(".ingredient-input-list");

    let ingRow = document.createElement("div");
    ingRow.setAttribute("class", "row create-ingredient-fact");

    let ingAmountDiv = document.createElement("div");
    ingAmountDiv.setAttribute("class", "col");
    let ingAmountInput = document.createElement("input");
    ingAmountInput.setAttribute("type", "number");
    ingAmountInput.setAttribute(
      "class",
      "form-control recipe-ingredient-amount"
    );
    ingAmountInput.setAttribute("placeholder", "Amount");
    ingAmountDiv.appendChild(ingAmountInput);

    let ingUnitDiv = document.createElement("div");
    ingUnitDiv.setAttribute("class", "col");
    let ingUnitInput = document.createElement("input");
    ingUnitInput.setAttribute("type", "text");
    ingUnitInput.setAttribute("class", "form-control recipe-ingredient-unit");
    ingUnitInput.setAttribute("placeholder", "Unit");
    ingUnitDiv.appendChild(ingUnitInput);

    let ingNameDiv = document.createElement("div");
    ingNameDiv.setAttribute("class", "col");
    let ingNameInput = document.createElement("input");
    ingNameInput.setAttribute("type", "text");
    ingNameInput.setAttribute("class", "form-control recipe-ingredient-name");
    ingNameInput.setAttribute("placeholder", "Name");
    ingNameDiv.appendChild(ingNameInput);

    ingRow.appendChild(ingAmountDiv);
    ingRow.appendChild(ingUnitDiv);
    ingRow.appendChild(ingNameDiv);
    createIngRoot.appendChild(ingRow);
  });

  // add step input to dom
  let addStepButton = document.querySelector(".add-step-button");
  addStepButton.addEventListener("click", (e) => {
    let createStepRoot = document.querySelector(".step-input-list");
    let allStepInput = document.querySelectorAll(".recipe-step-input");
    let stepInput = document.createElement("input");
    stepInput.setAttribute("type", "text");
    stepInput.setAttribute("class", "form-control recipe-step-input");
    stepInput.setAttribute("id", `step-${allStepInput.length}`);
    stepInput.setAttribute("placeholder", `Step ${allStepInput.length + 1}`);
    createStepRoot.appendChild(stepInput);
  });
  // create data object save to local storage.
  let createButton = document.querySelector(".create-recipe-button");
  createButton.addEventListener("click", (e) => {
    const ingredientAmount = document.querySelectorAll(
      ".recipe-ingredient-amount"
    );

    const ingredientUnits = document.querySelectorAll(
      ".recipe-ingredient-unit"
    );

    const ingredientNames = document.querySelectorAll(
      ".recipe-ingredient-name"
    );

    const steps = document.querySelectorAll(".recipe-step-input");

    let finalObject = {};

    // format serving
    const serving = document.querySelector(
      ".ingredient-serving-input"
    );
    finalObject["servings"] = serving.value;


    // format all the ingredients:
    let ingredientArray = [];
    for (let i = 0; i < ingredientNames.length; i++) {
      let ingObject = {};
      ingObject["name"] = ingredientNames[i].value;
      ingObject['amount'] = ingredientAmount[i].value;
      ingObject['unit'] = ingredientUnits[i].value;
      ingObject["measures"] = {
        us: {
          amount: ingredientAmount[i].value,
          unitShort: ingredientUnits[i].value,
          unitLong: ingredientUnits[i].value,
        },
        metric: {
          amount: ingredientAmount[i].value,
          unitShort: ingredientUnits[i].value,
          unitLong: ingredientUnits[i].value,
        },
      };
      ingredientArray.push(ingObject);
    }
    finalObject["extendedIngredients"] = ingredientArray;

    // format step array
    let stepArray = [];
    for (let i = 0; i < steps.length; i++) {
      let stepObject = {};
      stepObject['number'] = i + 1;
      stepObject['step'] = steps[i].value;
      stepArray.push(stepObject);
    }
    finalObject["analyzedInstructions"] = {
      name: "",
      steps: stepArray
    };

    // format summary 
    const summary = document.querySelector(
      ".recipe-input-summary"
    );
    finalObject["summary"] = summary.value;

    // format nutrition 
    const nutrition = document.querySelector(
      ".recipe-input-nutrition"
    );
    finalObject["nutrition"] = nutrition.value;

    // format preptime 
    const preptime = document.querySelector(
      ".recipe-preptime"
    );
    finalObject["preparationMinutes"] = preptime.value;

    // format cooktime 
    const cooktime = document.querySelector(
      ".recipe-cooktime"
    );
    finalObject["cookingMinutes"] = cooktime.value;

    // format image URL 
    const imageUrl = document.querySelector(
      ".recipe-image-url"
    );
    finalObject["image"] = imageUrl.value;

    // format rating
    const rating = document.querySelector(
      ".recipe-rating"
    );
    finalObject["averageRating"] = rating.value;

    // format name:
    const recipeName = document.querySelector(
      ".recipe-input-name"
    );
    finalObject["title"] = recipeName.value;

    // assign a random id (use recipe name)
    const recipeId = recipeName.value;
    finalObject["id"] = recipeId;

    storageFuncs.storeRecipeData("created", [finalObject]);
    storageFuncs.saveRecipeToList("created", recipeId)

    console.log(finalObject);
  });
}

window.addEventListener("DOMContentLoaded", init);
