// Jon and Antonia import:



// RecipeExpand.js
class RecipeExpand extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Create styles and root element
      const styles = document.createElement('style');
      const article = document.createElement('article');
  
      // Fill in styles and root element
      styles.innerHTML = `
      @import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
        
      html,
      body {
        font-family: Lato, sans-serif;
        margin: 0;
        padding: 0;
      }
      
      #sub-header {
        display: flex;
        outline: 1px solid rgb(0, 0, 0);
        margin-top: .75rem;
        padding: .5rem;
      }
      
      #body {
        outline: 1px solid rgb(0, 0, 0);
        margin-top: .75rem;
        padding: .5rem;
      }
      
      a {
        color: black;
        text-decoration: none;
      }
      
      nav {
        align-items: center;
        border-bottom: 2px solid black;
        display: flex;
        height: 4rem;
        justify-content: space-evenly;
        position: relative;
        width: 100%;
        z-index: 99;
      }
      
      .nav-logo {
        align-items: center;
        display: flex;
      }
      
      .nav-title {
        font-size: 1.5em;
      }
      
      .nav-icon {
        height: 3rem;
      }
      
      main {
        background-color: white;
        box-shadow: 0 0 10px rgb(0 0 0 / 15%);
        margin: 30px auto;
        max-width: 44rem;
        padding: 15px;
        transition: all 0.2s ease;
        width: 80%;
      }
      
      button {
        background-color: #ffffff;
        border: 1px solid rgb(0, 0, 0);
        color: rgb(0, 0, 0);
        padding: 5px 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 12px;
        cursor: pointer;
      }
      
      .divider {
        display: inline-block;
        height: 1.5rem;
        width: 1px;
        background: rgb(0, 0, 0);
        margin-right: 1rem;
        margin-left: 1rem;
        align-items: center;
      }
      
      div.title-edit {
        display: flex;
        justify-content: space-between;
        height: 2rem;
        align-items: center;
        margin-top: 1rem;
      }
      
      div.rating-favorite {
        display: flex;
        justify-content: space-between;
        height: 2rem;
        align-items: center;
        margin-bottom: 1rem;
      }
      
      div.rating {
        display: inline-flex;
        align-items: center;
      }
      
      div.sub-header{
        padding: .5rem;
        margin-top: .5rem;
        margin-bottom: .5rem;
        display: grid;
        outline: 0px solid rgb(0, 0, 0);
        width: 100%;
      }
      
      div.sub-body{
        padding: .5rem;
        margin-top: .5rem;
        margin-bottom: .5rem;
        display: grid;
        outline: 0px solid rgb(0, 0, 0);
      }
      
      div.ingredients {
        border-right: 1px solid rgb(0, 0, 0);
      }
      
      div.serving-adjust {
        display: flex;
        align-items: center;
        margin: 1rem;
      }
      
      div.quick-facts {
        border-bottom: 1px solid rgb(0, 0, 0);
      }
      
      div.measurements {
        padding-top: 1rem;
      }
      
      img.rating {
        height: 1rem;
        display:flex;
        align-items: center;
      
      }
      
      img.main-recipe-image{
        object-fit: cover;
        height: auto;
        max-height: 27rem;
        width: 100%;
        outline: 1px solid rgb(0, 0, 0);
        margin: 0rem;
      }
      
      p.title {
        font-size: 24px;
      }
      
      p.subtitle {
        font-size: 20px;
        margin: 0px;
        padding: 0px;
        text-decoration: underline;
        text-decoration-color: gold;
      }
      
      p.description {
        font-size: 16px;
        margin-top: .5rem;
        margin-bottom: .5rem;
        outline: 1px solid rgb(0, 0, 0);
        padding: .5rem;
      }
      
      p.quick-fact {
        padding-left: 1.75rem;
        margin-bottom: 1rem;
      }
      
      p.step {
        margin-bottom: .5rem;
      }
      
      ul.rating-stats {
        display: flex;
        padding-left: 1rem;
        align-items: center;
      
      }
      
      li.rating-stats {
        display: flex;
        margin: 0px;
        padding: 0px;
        align-items: center;
        color: rgb(121, 121, 121);
        font-size: 14px;
      
      }
      
      ul{
        padding-left: 1rem;
        padding-right: 2rem;
      }
      
      li.item {
        margin-bottom: 1rem;
        list-style: none;
      }
      
      li.steps {
        margin-top: .5rem;
      }`;
      // added <section> to contain html for expanded page:
    article.innerHTML = `
    <section class='expanded-recipe>
    <!-- Recipe Website Header -->
    <nav>
      <div class="nav-logo">
        <img src="../../images/pot.svg" alt="" class="nav-icon">
        <span class="nav-title">Recipe Book</span>
      </div>
      <!-- TODO: Call Router -->
        <a href="./landing.html">Home</a>
        <a href="./explore.html">Explore</a>
        <a href="./saved-recipes.html">Saved Recipes</a>
      <!-- TODO: Search bar should call Router and display search results, fetch results -->
      <form action="./search-results.html" class="search-bar">
        <input type="text" name="" id="" placeholder="Search recipes">
        <button type="submit">
            <i class="fa fa-search"></i>
        </button>
      </form>
    </nav>
    
    <!-- Recipe Content -->
    <main>
      <section id="header">
        <button> Return </button>

        <div class="title-edit">
          <p class = "title"> </p>
          <button> Edit </buttoin>
        </div>

        <!-- Rating Info: -->
        <div class="rating-favorite">
          <div class = "rating">
            <img src="5-star.svg" class="rating" alt="autpopulated by script">
            <ul class="rating-states">
              <li class="rating-stats">
                <!-- FILL IN WITH RATING STATS -->
                <span class="divider"></span>
              </li>
              <li class="rating-stats">
                <!-- FILL IN WITH NUMBER OF REVIEWS -->
              </li>
            </ul>
          </div>
          <button style="background-color: pink">Save Recipe</button>
        </div>

        <!-- Recipe Image: -->
        <img src="" class="main-recipe-image" alt="autpopulated by script">

        <!-- Recipe Description: -->
        <div class="recipe-description-wrapper">
          <p class="description">
            <!-- FILL IN WITH RECIPE DESCRIPTION -->
          </p>
        </div>
      </section>

      <!-- **Recipe General Info:** -->
      <!-- Recipe Ingredients + Measurements + Serving Size --> 
      <section id="sub-header">
        <div class="sub-header">
          <p class="subtitle">Ingredients</p>
          <ul class="ingredients">
            <!-- POPULATE WITH LIST ITEMS (<li>) OF INGREDIENTS -->
          </ul>
        </div>
        <div class="sub-header">
          <div class="quick-facts">
            <p class="subtitle">Quick Facts</p>
              <ul class="facts">
                <!-- POPULATE WITH LIST ITEMS (<li>) OF QUICK RECIPE INFO/FACTS -->
              </ul>
          </div>
          <div class="measurements">
            <p class="subtitle" style="margin-bottom: 1rem">Measurements</p>
            <button style="width: 100%;display: block;margin: auto;">Units: Imperial</button>
            <div class="serving-adjust" style="width: 100%;margin: auto;">
              <button style="width: 100%;margin-left: auto">-</button>
              <div class="serving-size" style="margin-top: 1rem; margin-bottom: 1rem; margin-left: 2rem; margin-right: 2rem">
                <!-- POPULATE WITH SERVING SIZE -->
              </div>
              <button style="width: 100%;margin-right: auto;">+</button>
            </div>
          </div>
        </div>
      </section>
      <!-- Recipe Preparation Instructions --> 
      <section id="body">
        <div class="sub-body">
          <p class="subtitle">Steps</p>
          <ol class="steps">
            <!-- POPULATE WITH LIST  ITEMS (<li>) of preparation steps
          </ol>
        </div>
      </section>

      <!-- SKIPPED VIDEO PART -->

      <!-- Recipe Nutrition Info -->
      <section id="body">
        <div class="sub-body">
          <p class="subtitle">Nutrition Facts</p>
          <!-- POPULATE BELOW p-tag WITH NUTRITION FACTS>
          <button>Full Nutrition</button>

          <!-- SKIPPED THE EXTRA STUFF HERE -->
          
      </section>
    </main>
  </section>
      `;
  
      // Append elements to the shadow root
      this.shadowRoot.append(styles, article);
    }
  
    /**
     * Sets the recipe that will be used inside the <recipe-expand> element.
     * Overwrites the previous recipe, fair warning.
     */
    set data(data) {
      this.json = data;
  
      // Reset HTML
      this.shadowRoot.querySelector('article').innerHTML = `
        <section class='expanded-recipe>
          <!-- Recipe Website Header -->
          <nav>
            <div class="nav-logo">
              <img src="../../images/pot.svg" alt="" class="nav-icon">
              <span class="nav-title">Recipe Book</span>
            </div>
            <!-- TODO: Call Router -->
              <a href="./landing.html">Home</a>
              <a href="./explore.html">Explore</a>
              <a href="./saved-recipes.html">Saved Recipes</a>
            <!-- TODO: Search bar should call Router and display search results, fetch results -->
            <form action="./search-results.html" class="search-bar">
              <input type="text" name="" id="" placeholder="Search recipes">
              <button type="submit">
                  <i class="fa fa-search"></i>
              </button>
            </form>
          </nav>
          
          <!-- Recipe Content -->
          <main>
            <section id="header">
              <button> Return </button>

              <div class="title-edit">
                <p class = "title"> </p>
                <button> Edit </buttoin>
              </div>

              <!-- Rating Info: -->
              <div class="rating-favorite">
                <div class = "rating">
                  <img src="5-star.svg" class="rating" alt="autpopulated by script">
                  <ul class="rating-states">
                    <li class="rating-stats">
                      <!-- FILL IN WITH RATING STATS -->
                      <span class="divider"></span>
                    </li>
                    <li class="rating-stats">
                      <!-- FILL IN WITH NUMBER OF REVIEWS -->
                    </li>
                  </ul>
                </div>
                <button style="background-color: pink">Save Recipe</button>
              </div>

              <!-- Recipe Image: -->
              <img src="" class="main-recipe-image" alt="autpopulated by script">

              <!-- Recipe Description: -->
              <div class="recipe-description-wrapper">
                <p class="description">
                  <!-- FILL IN WITH RECIPE DESCRIPTION -->
                </p>
              </div>
            </section>

            <!-- **Recipe General Info:** -->
            <!-- Recipe Ingredients + Measurements + Serving Size --> 
            <section id="sub-header">
              <div class="sub-header">
                <p class="subtitle">Ingredients</p>
                <ul class="ingredients">
                  <!-- POPULATE WITH LIST ITEMS (<li>) OF INGREDIENTS -->
                </ul>
              </div>
              <div class="sub-header">
                <div class="quick-facts">
                  <p class="subtitle">Quick Facts</p>
                    <ul class="facts">
                      <!-- POPULATE WITH LIST ITEMS (<li>) OF QUICK RECIPE INFO/FACTS -->
                    </ul>
                </div>
                <div class="measurements">
                  <p class="subtitle" style="margin-bottom: 1rem">Measurements</p>
                  <button style="width: 100%;display: block;margin: auto;">Units: Imperial</button>
                  <div class="serving-adjust" style="width: 100%;margin: auto;">
                    <button style="width: 100%;margin-left: auto">-</button>
                    <div class="serving-size" style="margin-top: 1rem; margin-bottom: 1rem; margin-left: 2rem; margin-right: 2rem">
                      <!-- POPULATE WITH SERVING SIZE -->
                    </div>
                    <button style="width: 100%;margin-right: auto;">+</button>
                  </div>
                </div>
              </div>
            </section>
            <!-- Recipe Preparation Instructions --> 
            <section id="body">
              <div class="sub-body">
                <p class="subtitle">Steps</p>
                <ol class="steps">
                  <!-- POPULATE WITH LIST  ITEMS (<li>) of preparation steps
                </ol>
              </div>
            </section>

            <!-- SKIPPED VIDEO PART -->

            <!-- Recipe Nutrition Info -->
            <section id="body">
              <div class="sub-body">
                <p class="subtitle">Nutrition Facts</p>
                <!-- POPULATE BELOW p-tag WITH NUTRITION FACTS>
                <button>Full Nutrition</button>

                <!-- SKIPPED THE EXTRA STUFF HERE -->
                
            </section>
          </main>
        </section>
      `;
  
      // Set Title
      const title = getTitle(data).toUpperCase();
      this.shadowRoot.querySelector('header > h1').innerHTML = title;
  
      // Set the Servings yield
      const servingsYield = getYield(data);
      this.shadowRoot.querySelector('.meta--yield').innerHTML = servingsYield;
  
      // Set the total time
      const totalTime = convertTime(searchForKey(data, 'totalTime'));
      this.shadowRoot.querySelector('.meta--total-time').innerHTML = totalTime;
  
      // Set Categories
      const categories = getCategories(data);
      this.shadowRoot.querySelector('.meta--categories').innerHTML = categories;
  
      // Set Description
      const description = getDescription(data);
      this.shadowRoot.querySelector('p.description').innerHTML = description;
  
      // Set Image
      const imgSrc = getImage(data);
      const img = this.shadowRoot.querySelector('img.thumbnail');
      img.setAttribute('src', imgSrc);
      img.setAttribute('alt', title);
  
      // Set Ratings
      const ratingVal = searchForKey(data, 'ratingValue');
      let ratingTotal = searchForKey(data, 'ratingCount');
      const rating = this.shadowRoot.querySelector('.rating--wrapper');
      const numStars = Math.round(ratingVal);
      if (ratingVal) {
        rating.innerHTML = `
        <img src="assets/images/icons/${numStars}-star.svg" alt="${numStars} stars">
        <span>${ratingVal}</span>
        from
        `;
        if (!ratingTotal) {
          ratingTotal = 'some';
        }
        rating.innerHTML += `<span class="rating-total">${ratingTotal} votes</span>`;
      } else {
        rating.innerHTML = `
          <span>No Reviews</span>
        `;
      }
  
      // Set Ingredients
      const ingredients = getIngredients(data);
      ingredients.forEach(ingredient => {
        const listItem = document.createElement('li');
        listItem.innerHTML = ingredient;
        this.shadowRoot.querySelector('.section--ingredients > ul').append(listItem);
      });
  
      // Set Instructions
      const instructions = getInstructions(data);
      instructions.forEach(instruction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = instruction;
        this.shadowRoot.querySelector('.section--instructions > ol').append(listItem);
      });
    }
  
    /**
     * Returns the object of the currect recipe being used.
     */
    get data() {
      return this.json;
    }
  }
  
  /**
   * Recursively search for a key nested somewhere inside an object
   * @param {Object} object the object with which you'd like to search
   * @param {String} key the key that you are looking for in the object
   * @returns {*} the value of the found key
   */
  function searchForKey(object, key) {
    var value;
    Object.keys(object).some(function (k) {
      if (k === key) {
        value = object[k];
        return true;
      }
      if (object[k] && typeof object[k] === 'object') {
        value = searchForKey(object[k], key);
        return value !== undefined;
      }
    });
    return value;
  }
  
  /**
   * Extract the title of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe title
   */
  function getTitle(data) {
    if (data.name) return data.name;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          if (data['@graph'][i]['name']) return data['@graph'][i]['name'];
        };
      }
    }
    return null;
  }
  
  /**
   * Extract the yield of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe yield
   */
  function getYield(data) {
    if (data.recipeYield) return data.recipeYield;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          if (data['@graph'][i]['recipeYield']) {
            if (Array.isArray(data['@graph'][i]['recipeYield'])) {
              return data['@graph'][i]['recipeYield'][0];
            } else if (typeof data['@graph'][i]['recipeYield'] == 'string') {
              return data['@graph'][i]['recipeYield'];
            }
          }
        }
      }
    }
    return null;
  }
  
  /**
   * Extract the categories of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe categories as a string
   */
  function getCategories(data) {
    let categories = null;
    if (data.recipeCategory) {
      categories = data.recipeCategory
    } else if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          if (data['@graph'][i]['recipeCategory']) {
            categories = data['@graph'][i]['recipeCategory'];
          }
        };
      }
    }
    if (Array.isArray(categories)) categories = categories.join(', ');
    return categories.toLowerCase();
  }
  
  /**
   * Extract the description of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the recipe description
   */
  function getDescription(data) {
    if (data.description) return data.description;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          return data['@graph'][i]['description'];
        }
      }
    }
    return null;
  }
  
  /**
   * Extract a usable image from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {String} If found, returns the URL of the image as a string, otherwise null
   */
  function getImage(data) {
    if (data.image?.url) return data.image.url;
    if (data.image?.contentUrl) return data.image.contentUrl;
    if (data.image?.thumbnail) return data.image.thumbnail;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'ImageObject') {
          if (data['@graph'][i]['url']) return data['@graph'][i]['url'];
          if (data['@graph'][i]['contentUrl']) return data['@graph'][i]['contentUrl'];
          if (data['@graph'][i]['thumbnailUrl']) return data['@graph'][i]['thumbnailUrl'];
        };
      }
    }
    return null;
  }
  
  /**
   * Extract the URL from the given recipe schema JSON object
   * @param {Object} data Raw recipe JSON to find the URL of
   * @returns {String} If found, it returns the URL as a string, otherwise null
   */
  function getUrl(data) {
    if (data.url) return data.url;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') return data['@graph'][i]['@id'];
      }
    };
    return null;
  }
  
  /**
   * Similar to getUrl(), this function extracts the organizations name from the
   * schema JSON object. It's not in a standard location so this function helps.
   * @param {Object} data Raw recipe JSON to find the org string of
   * @returns {String} If found, it retuns the name of the org as a string, otherwise null
   */
  function getOrganization(data) {
    if (data.publisher?.name) return data.publisher?.name;
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'WebSite') {
          return data['@graph'][i].name;
        }
      }
    };
    return null;
  }
  
  /**
   * Converts ISO 8061 time strings to regular english time strings.
   * Not perfect but it works for this lab
   * @param {String} time time string to format
   * @return {String} formatted time string
   */
  function convertTime(time) {
    let timeStr = '';
  
    // Remove the 'PT'
    time = time.slice(2);
  
    let timeArr = time.split('');
    if (time.includes('H')) {
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i] == 'H') return `${timeStr} hr`;
        timeStr += timeArr[i];
      }
    } else {
      for (let i = 0; i < timeArr.length; i++) {
        if (timeArr[i] == 'M') return `${timeStr} min`;
        timeStr += timeArr[i];
      }
    }
  
    return '';
  }
  
  /**
   * Extract the ingredients of the recipe from the given recipe schema JSON obejct
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {Array} If found, returns the recipe ingredients
   */
  function getIngredients(data) {
    if (data.recipeIngredient) {
      if (typeof data.recipeIngredient == 'string') {
        return data.recipeIngredient.slit('. ');
      }
      return data.recipeIngredient;
    };
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          if (typeof data['@graph'][i]['recipeIngredient'] == 'string') {
            return data['@graph'][i]['recipeIngredient'].slit('. ');
          }
          return data['@graph'][i]['recipeIngredient'];
        };
      }
    }
    return null;
  }
  
  /**
   * Extract the instructions of the recipe from the given recipe schema JSON obejct.
   * This ones a bit messy and optimally should be refactored but it works.
   * @param {Object} data Raw recipe JSON to find the image of
   * @returns {Array} If found, returns the recipe instructions
   */
  function getInstructions(data) {
    if (data.recipeInstructions) {
      if (typeof data.recipeInstructions == 'string') {
        return data.recipeInstructions.split('. ');
      }
      return data.recipeInstructions;
    };
    if (data['@graph']) {
      for (let i = 0; i < data['@graph'].length; i++) {
        if (data['@graph'][i]['@type'] == 'Recipe') {
          if (data['@graph'][i]['recipeInstructions'] == 'string') {
            return data['@graph'][i]['recipeInstructions'].split('. ');
          }
          if (data['@graph'][i]['recipeInstructions'][0]['itemListElement']) {
            const instructionArr = [];
            data['@graph'][i]['recipeInstructions'].forEach(instrObj => {
              instrObj.itemListElement.forEach(instruction => {
                instructionArr.push(instruction.text);
              });
            });
            return instructionArr;
          } else {
            return data['@graph'][i]['recipeInstructions'].map(instr => instr.text);
          }
        };
      }
    }
    return null;
  }
  
  customElements.define('recipe-expand', RecipeExpand);