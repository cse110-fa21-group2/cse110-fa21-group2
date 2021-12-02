/* eslint-disable import/extensions */
import * as fetcherFuncs from '../storage/fetcher.js';
import * as storageFuncs from '../storage/storage.js';

class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set populateFunc(func) {
    this.populate = func;
  }

  set data(data) {
    this.json = data;

    // Initialize saved/created properties
    const categories = fetcherFuncs.getAllSavedRecipeId();
    this.saved = categories.favorites && categories.favorites.includes(this.json.id);
    this.created = categories.created && categories.created.includes(this.json.id);

    const styleElem = document.createElement('style');
    const styles = `
    @import url("https://use.fontawesome.com/releases/v5.15.4/css/all.css");

    .custom-card {
      background: #eee;
      background-image: url(${data.image});
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 0.5rem;
      box-shadow: 0 2px 5px rgba(0 0 0 / 60%);
      display: inline-block;
      font-family: Lato, sans-serif;
      height: 17rem;
      margin: 1.5rem;
      overflow-wrap: break-word;
      overflow-y: hidden;
      position: relative;
      transition: 0.2s ease-in-out;
      white-space: normal;
      width: 15rem;
    }

    .custom-body {
      background-color: white;
      bottom: 0;
      display: grid;
      grid-template-columns: 8fr 1fr;
      grid-template-rows: 1fr 1fr;
      height: 25%;
      left: 0;
      max-width: 100%;
      padding: 1rem;
      position: relative;
      position: absolute;
      right: 0;
    }

    .custom-title {
      align-items: center;
      display: flex;
      font-size: 14px;
      grid-column: 1;
      grid-row: 1 / span 2;
      margin: 0;
      max-height: 100%;
      max-width: 100%;
      overflow-y: scroll;
      text-overflow: clip;
      white-space: normal;
    }

    .save-btn {
      background: white;
      border: none;
      border-radius: 0.25em;
      color: black;
      cursor: pointer;
      grid-column: 2;
      grid-row: 1;
    }

    .delete-btn {
      background: white;
      border: none;
      border-radius: 0.25em;
      color: black;
      cursor: pointer;
      grid-column: 2;
      grid-row: 2;
    }

    .fa-heart {
      color: red;
      font-size: 20px;
    }
    
    .custom-card:hover {
      border: none;
      box-shadow: 0 8px 20px rgba(0 0 0 / 60%);
      cursor: pointer;
      transform: scale(1.01);
    };`;

    styleElem.innerHTML = styles;
    this.shadowRoot.append(styleElem);

    const recipeCard = document.createElement('div');
    recipeCard.classList.add('custom-card');

    const recipeBody = document.createElement('div');
    recipeBody.classList.add('custom-body');

    const recipeName = document.createElement('h1');
    recipeName.classList.add('custom-title');
    recipeName.innerHTML = data.title;

    recipeBody.appendChild(recipeName);

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-btn');

    const saveIcon = document.createElement('i');
    saveIcon.classList.add('fa-heart');
    saveIcon.classList.add(this.saved ? 'fas' : 'far');

    saveButton.appendChild(saveIcon);
    const flipSaved = (e) => {
      e.stopPropagation();
      const currCards = document.querySelectorAll(`.id_${this.json.id}`);
      const currSavedPageSelect = document.querySelector('select.list-dropdown').value;
      if (this.saved) {
        storageFuncs.removeRecipeFromList('favorites', this.json.id);
        if (currSavedPageSelect === 'List 1') {
          // remove card in saved recipe page
          const grid = document.querySelector('.saved-recipes .results-grid');
          const currentCardsSaved = grid.querySelectorAll(`.id_${this.json.id}`);
          for (let i = 0; i < currentCardsSaved.length; i++) {
            currentCardsSaved[i].remove();
          }
        }
      } else {
        storageFuncs.saveRecipeToList('favorites', this.json.id);
        if (currSavedPageSelect === 'List 1') {
          // add card to saved recipe page
          const grid = document.querySelector('.saved-recipes .results-grid');
          const recipeCardNew = document.createElement('recipe-card');
          recipeCardNew.setAttribute('class', `id_${this.json.id}`);
          recipeCardNew.populateFunc = this.populate;

          recipeCardNew.data = this.json;
          grid.appendChild(recipeCardNew);
        }
      }
      for (let i = 0; i < currCards.length; i++) {
        const { shadowRoot } = currCards[i];
        const element = shadowRoot.querySelector('.fa-heart');
        if (currCards[i].saved) {
          element.classList.add('far');
          element.classList.remove('fas');
        } else {
          element.classList.remove('far');
          element.classList.add('fas');
        }
        currCards[i].saved = !currCards[i].saved;
      }
    };

    saveButton.addEventListener('click', flipSaved);

    recipeBody.appendChild(saveButton);

    if (this.created) {
      const deleteRecipe = document.createElement('button');
      deleteRecipe.classList.add('delete-btn');

      const clickDelete = (e) => {
        e.stopPropagation();
        storageFuncs.deleteCreatedRecipe(this.json.id);
        const currentCards = document.querySelectorAll(`.id_${this.json.id}`);
        for (let i = 0; i < currentCards.length; i++) {
          currentCards[i].remove();
        }
      };

      deleteRecipe.addEventListener('click', clickDelete);

      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas');
      deleteIcon.classList.add('fa-trash-alt');
      deleteRecipe.appendChild(deleteIcon);
      recipeBody.appendChild(deleteRecipe);
    }

    recipeCard.appendChild(recipeBody);
    recipeCard.addEventListener('click', () => {
      this.populate(data);
      console.log(data);
    });

    this.shadowRoot.append(recipeCard);
  }
}

customElements.define('recipe-card', RecipeCard);
