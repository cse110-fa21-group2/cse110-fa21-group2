// RecipeCard.js

class RecipeCard extends HTMLElement {
  constructor() {
    super(); // inherets everything from HTMLElement
    this.attachShadow({ mode: 'open' }); // Creates the Shadow DOM
  }

  set data(data) {
    this.json = data; // Store the data passed in for later

    // Store the element styles in a <style> block, needed bc of the shadow DOM
    const styles = document.createElement('style');

    // TODO: Input style
    styles.innerHTML = `
      .card {
        align-items: center;
        background-color: white;
        border-radius: 3px;
        display: grid;
        grid-template-areas:
        'image'
        'title'
        'star';
        height: 200px;
        margin: auto;
        padding: 2px, 1px;
        width: 400px;
      }
    `;

    // Create the outer wrapper for the recipe card to nest inside
    const wrapper = document.createElement('div');
    wrapper.classList.add('card');

    // Create the recipe image element
    const img = document.createElement('img');
    img.setAttribute('src', data.image);
    img.setAttribute('alt', data.title);
    img.setAttribute('width', 200);

    // Create the recipe title
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerHTML = data.title;

    // Assigning "this" to variable to access inside func
    const recipeCard = this;


    // Add all of the above elements to the wrapper
    wrapper.append(img, title);

    // Append the wrapper and the styles to the Shadow DOM
    this.shadowRoot.append(styles, wrapper);
  }

  get data() {
    return this.json;
  }
}

customElements.define('recipe-card', RecipeCard);