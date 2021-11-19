class RecipeCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.saved = false;
  }

  set data(data) {
    // TODO: update info based on json data
    this.json = data;

    const styleElem = document.createElement('style');
    const styles = `
    @import url("https://use.fontawesome.com/releases/v5.15.4/css/all.css");
      .recipe-card {
        background: white;
        border: 1px solid black;
        display: inline-block;
        height: 17rem;
        margin: 0 1.5rem 1.5rem 0;
        width: 15rem;
        white-space: normal;
        overflow-y: scroll;
        overflow-wrap: break-word;
        border-radius: 0.5rem;
      }

      .card-shadow {
        border: none;
        box-shadow: 0 2px 5px rgba(0,0,0,0.6);
        transition: 0.2s ease-in-out;
      }
      .card-shadow:hover, .card-shadow:focus {
        border: none;
        transform: scale(1.01);
        box-shadow: 0 8px 20px rgba(0,0,0,0.6);
      }

      .card-header {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
      }

      .card-header.card-img {
        overflow: hidden;
      }
      .card-header.card-img > img{
        display: block;
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
      }

      .card-body {
        font-size: 0.8rem;
        padding: 0 1rem;
      }

      .card-footer {
        padding: 0 1rem 1rem 1rem;
      }

      .card-btn {
        background: var(--color);
        color: white;
        border: none;
        --color: hsl(200, 50%, 50%);
        cursor: pointer;
        transition: 0.2s ease-in-out;
        border-radius: 0.25em;
        padding: 0.5em 0.75em;
      }

      .card-btn:hover, .card-btn:focus {
        background: hsl(200, 50%, 60%);
      }

      .card-btn.card-btn-outline {
        background: none;
        border: 1px solid var(--color);
        color: rgb(255, 52, 52);
      }

      .card-btn.card-btn-outline:hover, .card-btn.card-btn-outline:focus {
        /* background: hsl(200, 50%, 90%); */
      }
    `;
    styleElem.innerHTML = styles;
    this.shadowRoot.append(styleElem);

    const card = document.createElement('article');
    card.classList.add('recipe-card');
    card.classList.add('card-shadow');

    const header = document.createElement('div');
    header.classList.add('card-header');
    header.classList.add('card-img');

    const recipePic = document.createElement('img');
    recipePic.src = 'https://source.unsplash.com/random';

    header.appendChild(recipePic);
    card.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('card-body');

    const title = document.createElement('h1');
    title.innerHTML = 'Recipe Name';

    body.appendChild(title);
    card.appendChild(body);

    const footer = document.createElement('div');
    footer.classList.add('card-footer');

    const viewRecipe = document.createElement('button');
    viewRecipe.classList.add('card-btn');
    viewRecipe.innerHTML = 'View Recipe';

    const saveRecipe = document.createElement('button');
    saveRecipe.classList.add('card-btn');
    saveRecipe.classList.add('card-btn-outline');

    const saveIcon = document.createElement('i');
    saveIcon.classList.add('far');
    saveIcon.classList.add('fa-heart');

    const flipSaved = (element) => {
      if (this.saved) {
        element.children[0].classList.add('far');
        element.children[0].classList.remove('fas');
      } else {
        element.children[0].classList.remove('far');
        element.children[0].classList.add('fas');
      }
      this.saved = !this.saved;
    };

    saveRecipe.addEventListener('onclick', flipSaved);
    saveRecipe.appendChild(saveIcon);

    footer.appendChild(viewRecipe);
    footer.appendChild(saveRecipe);

    card.appendChild(footer);

    this.shadowRoot.append(card);
  }

  get data() {
    return this.json;
  }
}

customElements.define('recipe-card', RecipeCard);
