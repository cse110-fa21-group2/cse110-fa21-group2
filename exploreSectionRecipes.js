// for creating the wrapper custom element
// for explore and its recipe cards
// (namely, for Trending Recipes):

class ExploreSectionRecipes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    // Create root element:
    const article = document.createElement('article');
    article.innerHTML = `
    <div class="explore-section">
      <h1 class="row-title">Trending Recipes</h1>
      <hr class="line">
      <div class="recipe-row">
      </div>
    </div>`;

    // append element to shadow root:
    this.shadowRoot.append(article);
  }
}
customElements.define('explore-rec-section', ExploreSectionRecipes);