class ExpandedRecipe extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Need to determine format of expanded recipe card

        const styles = document.createElement('style'); // for CSS styles
        const article = document.createEleement('article'); // for expanded recipe card

        // ***************
        // Need to determine format of CSS for recipe card
        // ** REPLACE THE BELOW (TAKEN FROM LAB 7, BUT NOT ALLOWED TO BE USED;
        // ** IT'S ONLY HERE TO TEST)
        styles.innerHTML = `
      article {
        background-color: white;
        box-shadow: 0 0 10px rgb(0 0 0 / 15%);
        margin: 30px auto;
        max-width: 720px;
        padding: 25px;
        transition: all 0.2s ease;
        width: 80%;
      }

      div.rating--wrapper {
        align-items: center;
        column-gap: 5px;
        display: flex;
        justify-items: center;
        margin-top: 10px;
      }
      
      div.rating--wrapper > img {
        height: auto;
        display: inline-block;
        object-fit: scale-down;
        width: 78px;
      }

      header {
        align-items: flex-start;
        column-gap: 10px;
        display: grid;
        grid-template-areas:
         'title title img'
         'meta meta img'
         'desc desc img';
      }

      header p {
        margin: 0;
      }

      header > h1 {
        font-size: 2rem;
        font-weight: 500;
        grid-area: title;
        margin: -10px 0 0 0;
        padding: 0;
      }

      h2 {
        font-size: 1.5rem;
        font-weight: 500;
        margin: 35px 0 0 0;
      }

      header > div.meta--wrapper {
        display: grid;
        grid-area: meta;
        margin: 10px 0;
        row-gap: 4px;
      }

      header > div.meta--wrapper p,
      main > div.rating--wrapper {
        color: gray;
        font-style: italic;
      }

      header > div.meta--wrapper 
      :is(.meta--yield, .meta--total-time, .meta--categories) {
        color: black;
        font-style: normal;
        font-weight: 600;
      }

      header img.thumbnail {
        aspect-ratio: 1;
        grid-area: img;
        object-fit: cover;
        overflow: hidden;
        width: 230px;
      }

      header p.description {
        height: 62px;
        line-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      main > .section--ingredients,
      main > .section--instructions {
        font-size: 1.1rem;
      }

      span.rating-total {
        margin-left: -2px;
      }

      ol, ul {
        margin-top: 10px;
      }

      ol li:not(:first-child) {
        margin-top: 15px;
      }

      ol li::marker {
        padding-right: 5px;
      }

      ul li {
        padding-left: 2px;
      }

      ul li:not(:first-child) {
        margin-top: 8px;
      }
    `;
    //**********


    // Need to determine format of recipe card
    // (Here it is based both on Britney's ../source/recipePage.html)
    // and on the more recent Figma design (as of 11/14)
    article.innerHTML = `
    <main>
      <!-- Top header: -->
        <section id="header">

            <!-- Return button -->
            <div class="button-return-wrapper">
                <button class="placeholder" type="button">
                    Return
                </button>
            </div>
            <!-- Title -->
            <!--Name of the Recipe to be populated by JS -->
            <div class="title">
                <h2 class="recipe-header-tile">
                    <!-- Put recipe title here -->
                </h2>
            </div>
            <!-- Edit button: -->
            <div class="button-edit-wrapper">
                <button class="placeholder" type="button">
                    Edit
                </button>
            </div>
            <!-- Rating: -->
            <div class="rating-stars">
                <!-- NEED TO DETERMINE HOW RATING STARS FEATURE DISPLAYS -->
                <!-- PUT RATING STARS HERE -->
            </div>

            <!-- Save recipe button: -->
            <div class="button-save-recipe-wrapper">
                <!-- Like/Unlike recipe -->
                <button class="placeholder" type="button">
                    Save Recipe
                </button>
            </div>
        </section>
        

        <section id="main-body">
            <!-- Image of recipe -->
            <!-- **NEED TO UPDATE WITH PATH TO RECIPE IMAGE** --> 
            <img src="" class="main-recipe-image" alt="Recipe Header Image">

            <div class="recipe-description-wrapper">
                <!-- Short blurb about recipe --> 
                <p> **PLACEHOLDER TEXT**</p>  
            </div>
        
            <div class="ingredients-list-wrapper">
                <!-- Ingredients list. **ADDED VIA JS SIMILAR TO IN LAB 6** -->
            </div>

            <div class="quick-facts-wrapper">
                <!-- QuickFacts.  **ADDED VIA JS SIMILAR TO IN LAB 6**  -->
            </div>

            <!-- Measurements "section" of recipe page: -->
            <div class="measurements-wrapper">
                <div class="units-wrapper">
                    <!-- **ADD JS TO FILL IN UNITS** -->
                </div>
                <div class="servings-wrapper">
                    <!-- **ADD JS TO FILL IN SERVINGS AND TO HANDLE ITS FUNCTIONALITY** -->
                </div>
            </div>

            <!-- 

            <div class="instructions-wrapper">
                <!-- Instructions. **ADDED VIA JS SIMILAR TO IN LAB 6**  -->
            </div>
        </section>


        <section id="footer">
            <div class="nutrition-wrapper">
                <!-- Nutrition information (per serving)-->
            </div>
        
            <!-- **BELOW ARE POTENTIAL EXTRA FEATURES CARRIED OVER; REMOVE IF NOT NECESSARY** -->
            <div class="recipe-tags-wrapper">
                <!-- Tags // Possible extra feature- see related recipes by tag-->
            </div>
            <div class="recipe-related-tags-wrapper">
                <!-- Related tags EXTRA FEATURE -->
            </div>
            <div class="related-recipes-wrapper">
                <!-- Related recipes EXTRA FEATURE -->
            </div>
        </section>
    </main>`;  

    // append the above elements (styles: CSS styles; article: HTML content)
    // to shadow root for expanded recipe element:
    this.shadowRoot.append(styles);
    this.shadowRoot.append(article);
  }

 



}