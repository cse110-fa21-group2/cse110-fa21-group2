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
          <button> Edit </button>
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

      // Assume we're passed a single recipe as data


  
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
  customElements.define('recipe-expand', RecipeExpand);

 // from lab 7:
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
  
  function getTitle(data) {
    return searchForKey(data, "title");
  }

  function getRecID(data) {
    return searchForKey(data, "id");
  }

  // gets img for recipe
  function getImgSrc(data) {
    return searchForKey(data, "image");
  }
  
  // returns array of ingredients
  function getIngredArray(data) {
    // an array of ingredient objects:
    let ingredList = searchForKey(data, "extendedIngredients");
    ingredListLen = ingredList.length;
    let ingredListArr = []
    // populate ingredients list (append each time):
    for(let i = 0; i < ingredListLen; i++) {
      ingredListArr[i] = ingredList[i]("name");
    }
    return ingredListArr;
  }

  // returns ingredients as single
  // comma-separated string:
  function getIngredString(data) {
    // an array of ingredient objects:
    let ingredList = searchForKey(data, "extendedIngredients");
    ingredListLen = ingredList.length;
    let ingredListStr = "";
    // populate ingredients list (append each time):
    for(let i = 0; i < ingredListLen; i++) {
      ingredListString += ingredList[i]("name");
      // add comma after all but last ingredient:
      if(i != ingredListLen - 1) {
        ingredListString += ", ";
      }
    }
    return ingredListString;
  }

  // returns array of U.S. measurements:
  function getUSMeasurArray(data) {
    // an array of ingredient objects:
    let ingredList = searchForKey(data, "extendedIngredients");
    ingredListLen = ingredList.length;
    let measurementsArr = "";
    // populate measurements list (append each time):
    for(let i = 0; i < ingredListLen; i++) {
      measurementsArr[i]  
        = ingredList[i]["measures"]["us"]["amount"]
          + ingredList[i]["measures"]["us"]["unitShort"];
      
    }
    return measurementsArr;
  }

  // returns string of U.S. measurements:
  function getUSMeasurArray(data) {
    // an array of ingredient objects:
    let ingredList = searchForKey(data, "extendedIngredients");
    ingredListLen = ingredList.length;
    let measurementsStr = "";
    // populate measurements list (append each time):
    for(let i = 0; i < ingredListLen; i++) {
      measurementsStr
        += ingredList[i]["measures"]["us"]["amount"]
          + ingredList[i]["measures"]["us"]["unitShort"];
      // add comma after all but last measurement:
      if(i != ingredListLen - 1) {
        measurementsStr += ", ";
      }
    }
  }

  // returns rating (**NOTE: NO RATING GIVEN, SO REPLACE THIS;
  // DUMMY SPOONACULAR SCORE USED FOR NOW**)
  function getRatingStat(data){
    return searchForKey(data, "spoonacularScore");
  }

  // returns total number of likes:
  function getNumLikes(data){
    return searchForKey(data, "aggregateLikes");
  }

  // returns recipe short description / summary:
  function getSummary(data) {
    return searchForKey("summary");
  }

  

  function getUSMeasures(data) {
    return searchForKey(data, )
  }





  /**
   * 
   * @param {Object} data // assume data is passed as object for single recipe 
   */
  function getTitle(data) {
      return searchForKey(data, "originalName");
  }
  
  // returns measurements in US units:
  function getUSMeasures(data) {
      return searchForKey(data["measures"], "us");
  }
  
  // get recipe's ID:
  function getRecID(data) {
      return searchForKey(data, "id");
  }
  
  // get recipe's ingredients:
  function getIngred(data) {
      // TODO: get individual step ingredients (in nested .JSON objects)
      return searchForKey(data, "instructions");
  }
  
  // get img for recipe
  function getImg(data) {
      return searchForKey(data, "image");
  }
  
  // try to get quick facts (slightly modified from Design Team's specs
  // as couldn't find all the info):
  function getQuickFacts(data) {
      return searchForKey(data, "nameClean") + "\n" 
      + searchForKey(data, consistency) + "\n"
      + searchForKey(data, "unit") + "\n"
      + searchForKey(data, "unit"); 
  }

