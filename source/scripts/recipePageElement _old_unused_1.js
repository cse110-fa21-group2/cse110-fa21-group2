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
          <--! img src="" alt="" class="nav-icon" -->
          <span class="nav-title">Recipe Book</span>
        </div>
        <!-- TODO: Call Router -->
          <a href="">Home</a>
          <a href="">Explore</a>
          <a href="">Saved Recipes</a>
        <!-- TODO: Search bar should call Router and display search results, fetch results -->
        <form action="" class="search-bar">
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
            <p class="title"> </p>
            <button> Edit </button>
          </div>

          <!-- Rating Info: -->
          <div class="rating-favorite">
            <div class = "rating">
              <!-- img src="" class="rating" alt="autpopulated by script" -->
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
        <section class="body">
          <div class="sub-body">
            <p class="subtitle">Steps</p>
            <ol class="steps">
              <!-- POPULATE WITH LIST  ITEMS (<li>) of preparation steps
            </ol>
          </div>
        </section>

        <!-- SKIPPED VIDEO PART -->

        <!-- Recipe Nutrition Info -->
        <!-- Note: changed from id="body" to class="body" as is used > 1 time -->
        <section class="body">
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
      this.shadowRoot.append(styles);
      this.shadowRoot.append(article);

      console.log("this.shadowRoot after article added:");
      console.log(this.shadowRoot);
      console.log("this.shadowRoot.article after article added:");
      console.log(this.shadowRoot.querySelector("article"));
    }
  
    /**
     * Sets the recipe that will be used inside the <recipe-expand> element.
     * Overwrites the previous recipe, fair warning.
     */
    set data(data) {
      this.json = data;
  
      console.log("this.shadowRoot before setting in set data(data):");
      console.log(this.shadowRoot);

      // Reset HTML
      this.shadowRoot.querySelector('article').innerHTML = `
      <section class='expanded-recipe>
      <!-- Recipe Website Header -->
      <nav>
        <div class="nav-logo">
          <img src="" alt="" class="nav-icon">
          <span class="nav-title">Recipe Book</span>
        </div>
        <!-- TODO: Call Router -->
          <a href="">Home</a>
          <a href="">Explore</a>
          <a href="">Saved Recipes</a>
        <!-- TODO: Search bar should call Router and display search results, fetch results -->
        <form action="" class="search-bar">
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
            <p class="title"> </p>
            <button> Edit </button>
          </div>
  
          <!-- Rating Info: -->
          <div class="rating-favorite">
            <div class = "rating">
              <img src="" class="rating" alt="autpopulated by script">
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

      // Now start setting the data/properties of the html
      // after having declared its skeleton above:

    /*
      ** CREATING HTML MANUALLY WITH JS, AS ASSIGNING TO article.innerHTML
      WITH THAT BIG A STRING SEEMS TO CAUSE ISSUES (per OH) **
    */ 
    
    // wrapper:
    let articleEl = document.createElement("article");

    let secEl = "";
    let secElExpRecs = document.createElement("section");
    secElExpRecs.setAttribute("class", "expanded-recipe");
    articleEl.appendChild(secElExpRecs);

    let navEl = document.createElement("nav");
    navEl.setAttribute("class", "nav-logo");
    secElExpRecs.appendChild(navEl);

    let divEl = document.createElement("logo");
    divEl.setAttribute("class", "nav-logo");
    navEl.appendChild(divEl);

    let imgEl = document.createElement("img");
    imgEl.setAttribute("src", "/source/images/pot.svg");
    imgEl.setAttribute("alt", "auto-populated");
    imgEl.setAttribute("class", "nav-icon");
    let spanEl = document.createElement("span");
    spanEl.setAttribute("class", "nav-title");
    divEl.appendChild(imgEl);
    divEl.appendChild(spanEl);

    let aElHome = document.createElement("a");
    aElHome.setAttribute("href", "LINK_TO_HOME");
    aElHome.innerHTML = "Home";
    let aElExplore = document.createElement("a");
    aElExplore.setAttribute("href", "LINK_TO_EXPLORE");
    aElExplore.innerHTML = "Explore";
    let aElSaved = document.createElement("a");
    aElSaved.setAttribute("href", "LINK_TO_SAVED_RECIPES");
    aElSaved.innerHTML = "Saved Recipes";
    divEl.appendChild(aElHome);
    divEl.appendChild(aElExplore);
    divEl.appendChild(aElSaved);

    let formEl = document.createElement("form");
    formEl.setAttribute("action", "");
    formEl.setAttribute("class", "search-bar");
    divEl.appendChild(formEl);

    let inputEl = document.createElement("input");
    let buttonEl = document.createElement("button");
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("name", "");
    inputEl.setAttribute("id", "");
    inputEl.setAttribute("placeholder", "Search recipes");
    buttonEl.setAttribute("type", "submit");
    formEl.appendChild(inputEl);
    formEl.appendChild(buttonEl);
    let iEl = document.createElement("i");
    iEl.setAttribute("class", "fa fa-search");
    buttonEl.appendChild(iEl);

    let mainEl = document.createElement("main");
    secElExpRecs.appendChild(mainEl);

    let secElHeader = document.createElement("section");
    mainEl.appendChild(secElHeader);

    buttonEl = document.createElement("button"); 
    buttonEl.innerHTML = "Return";
    secElHeader.appendChild(buttonEl);

    divEl = document.createElement("div");
    let pEl = document.createElement("p");
    pEl.setAttribute("class", "title");
    divEl.appendChild(pEl);
    buttonEl = document.createElement("button");
    buttonEl.innerHTML = "Edit";
    divEl.appendChild(buttonEl);
    secElHeader.appendChild(divEl);

    // Rating info:
    let divRatFavEl = document.createElement("div");
    divRatFavEl.setAttribute("class", "rating-favorite");
    let divRatEl = document.createElement("div");
    divRatEl.setAttribute("class", "rating");
    divRatFavEl.appendChild(divRatEl);
    imgEl = document.createElement("img");
    imgEl.setAttribute("src", "/source/images/5-star.svg");
    imgEl.setAttribute("alt", "autopopulate");
    divRatEl.appendChild(imgEl);
    let ulEl = document.createElement("ul"); // NOTE: to include <li class=rating-stats"> or not?
    spanEl = document.createElement("span");
    spanEl.setAttribute("class", "divider");
    ulEl.appendChild(spanEl);  // NOTE: span divider will appear before list items for <ul> rating stats
    divRatEl.appendChild(ulEl);
    buttonEl = document.createElement("button");
    buttonEl.setAttribute("style", "background-color: pink");
    buttonEl.innerHTML = "Save Recipe";
    divRatFavEl.appendChild(buttonEl);
    secElHeader.appendChild(divRatFavEl);
    
    // Recipe image:
    imgEl = document.createElement("img");
    imgEl.setAttribute("src", "");
    imgEl.setAttribute("class", "main-recipe-image");
    imgEl.setAttribute("alt", "autopulate");
    secElHeader.appendChild(imgEl);

    // Recipe description:
    divEl = document.createElement("div");
    divEl.setAttribute("class", "recipe-description-wrapper");
    pEl = document.createElement("p");
    pEl.setAttribute("class", "description");
    divEl.appendChild(pEl);
    secElHeader.appendChild(divEl);

    // Recipe general info: recipe ingredients + measurements + serving size:
    let secElSubHeader = document.createElement("section");
    secElSubHeader.setAttribute("id", "sub-header");
    // 
    let divSubHead = document.createElement("div");
    divSubHead.setAttribute("class", "sub-header");
    pEl = document.createElement("p");
    pEl.setAttribute("class", "subttitle");
    pEl.innerHTML = "Ingredients";
    ulEl = document.createElement("ul");
    ulEl.setAttribute("class", "ingredients");
    divSubHead.appendChild(pEl);
    divSubHead.appendChild(ulEl);
    secElSubHeader.appendChild(divSubHead);
    // 
    divSubHead = document.createElement("div");
    divSubHead.setAttribute("class", "sub-header");
    divEl = document.createElement("div");
    divEl.setAttribute("class", "quick-facts");
    pEl = document.createElement("p");
    pEl.setAttribute("class", "subtitle");
    pEl.innerHTML = "Quick Facts";
    ulEl = document.createElement("ul");
    ulEl.setAttribute("class", "facts");
    divEl.appendChild(pEl);
    divEl.appendChild(ulEl);
    divSubHead.appendChild(divEl);
    secElHeader.appendChild(divSubHead);
    //
    let divMeas = document.createElement("div");
    divMeas.setAttribute("class", "measurements");
    pEl = document.createElement("p");
    pEl.setAttribute("class", "subtitle");
    pEl.setAttribute("style", "margin-bottom: 1rem;");
    pEl.innerHTML = "Measurements";
    buttonEl = document.createElement("button");
    buttonEl.setAttribute("style", "width: 100%; display: block; margin: auto;");
    buttonEl.innerHTML = "Units: Imperial";
    divEl = document.createElement("div");
    divEl.setAttribute("class", "serving-adjust");
    divEl.setAttribute("style", "width: 100%; margin: auto;");
    let buttonEl2 = document.createElement("button");
    buttonEl2.setAttribute("class", "serving-adjust");
    buttonEl2.setAttribute("style", "width: 100%; margin-left: auto;");
    buttonEl2.innerHTML = "-";
    let divEl2 = document.createElement("div");
    divEl2.setAttribute("class", "serving-size");
    divEl2.setAttribute("style", "margin-top: 1rem; margin-bottom: 1rem; margin-left: 2rem; margin-right: 2rem");
    let buttonEl3 = document.createElement("button");
    buttonEl3.setAttribute("style", "width: 100%; margin-right:auto");
    buttonEl3.innerHTML = "+";
    divMeas.appendChild(pEl);
    divMeas.appendChild(buttonEl);
    divEl.appendChild(buttonEl2);
    divEl.appendChild(divEl2);
    divEl.appendChild(buttonEl3);
    divMeas.appendChild(divEl);
    secElHeader.appendChild(divMeas);
    mainEl.appendChild(secElHeader);

    // Recipe preparation/cooking instructions:
    secElHeader = document.createElement("section");
    secElHeader.setAttribute("class", "body");
    divEl = document.createElement("div");
    divEl.setAttribute("class", "sub-body");
    pEl = document.createElement("p");
    pEl.setAttribute("class", "subtitle");
    pEl.innerHTML = "Steps";
    let olEl = document.createElement("ol");
    divEl.appendChild(pEl);
    divEl.appendChild(olEl);
    secElHeader.appendChild(divEl);
    mainEl.appendChild(secElHeader);

    // Recipe nutrition info:
    secElHeader = document.createElement("section");
    secElHeader.setAttribute("class", "body");
    divEl = document.createElement("div");
    divEl.setAttribute("class", "sub-body");
    pEl = document.createElement("p");
    pEl.setAttribute("class", "subtitle");
    pEl.innerHTML = "Nutrition Facts";
    buttonEl = document.createElement("button");
    buttonEl.innerHTML = "Full Nutrition";
    divEl.appendChild(pEl);
    divEl.appendChild(buttonEl);
    secElHeader.appendChild(divEl);
    mainEl.appendChild(secElHeader);

    // append to shadow DOM:
    this.shadowRoot.append(articleEl);
   


    console.log("this.shadowRoot.querySelector('article').innerHTML:");
    console.log(this.shadowRoot.querySelector('article').innerHTML);
    console.log(this.shadowRoot);

    console.log("testing this.shadowRoot.querySelector():");
    console.log(this.shadowRoot.querySelector("p"));

    // Set Title
  //  let pEl = document.createElement("p");
  //  pEl.innerHTML = "Hello";
    this.shadowRoot.querySelector('article').appendChild(pEl);
    console.log("this.shadowRoot:");
    console.log(this.shadowRoot);


    const title = getTitle(data).toUpperCase();
    this.shadowRoot.querySelector('div > p.title').innerHTML = title;

    // Set the Servings yield
    //const servingsYield = getYield(data);
    // - Sets the serving size:
    // this.shadowRoot.querySelector('ul > li.rating-stats').innerHTML = "Servings: " + numServings;
    // 
    const ratingLiArr = this.shadowRoot.querySelectorAll('ul > li.rating-stats');
    ratingLiArr[0].innerHTML = getRatingStat(data) + "<span class='divider'></span>";
    ratingLiArr[1].innerHTML = getNumLikes(data) + " likes.";

    // Set image:
    const recImg = this.shadowRoot.querySelector("section#header > img");
    const recImgSrc = getImg(data);
    recImg.setAttribute("src", recImgSrc);
    recImg.setAttribute("alt", title); // set alt text for rec image to rec's title

    // Set description:
    const descrEl = this.shadowRoot.querySelector("div > p.description");
    const descr = getSummary(data);
    descrEl.innerHTML = descr;

    // Set/create ingredients list
    // (create list items, <li>'s, for individual ingredients
    // and their amounts):
    const ingUlEl = this.shadowRoot.querySelector("div > ul.ingredients");
    const ingredArr = getIngredArray(data); // array of ingredients 
    for(let i = 0; i < ingredArr.length; i++) {
      let ingredListItem = document.createElement("li");
      ingredListItem.setAttribute("class", "item");
      ingredListItem.innerHTML = ingredArr[i];
      ingUlEl.appendChild(ingredListItem);
    }

    // Set/create quick facts list
    // (create list items, <li>'s, for individual quick facts
    // and their amounts):
    const qfUlEl = this.shadowRoot.querySelector("p.subtitle > ul.facts"); // qf list <ul>
    const qfArr = this.getQuickFactsArr; // get quick facts array
    for(let i = 0; i < qfArr.length; i++) {
      let qfListItem = document.createElement("li");
      qfListItem.setAttribute("class", "item");
      qfListItem.innerHTML = qfArr[i];
      qfUlEl.appendChild(qfListItem);
    }
    
    // Set/create steps list
    // (create list items, <li>'s, for individual steps):
    const stepOlEl = document.querySelector('div.steps-wrapper > ol.steps'); // step list <ol>
    const stepsArr = this.getRecInstrucitonsArr;
    for(let i = 0; i < stepsArr.length; i++) {
      let stepListItem = document.createElement("li");
      stepListItem.setAttribute("class", "steps");
      stepListItem.innerHTML = stepsArr[i];
      stepOlEl.appendChild(stepListItem);
    }




      


      
      

    /* 
      // Set the total time (time is returned in minutes, as is stored
      // as total number of minutes in .JSON file):
      // const totalTime = convertTime(searchForKey(data, 'totalTime'));
      const recTime = getRecTime(data);
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
    */ 
    /**
     * Returns the object of the currect recipe being used.
     */
    
    } 

    get data() {
      return this.json;
    }
  } // end of class
  customElements.define('recipe-expand', RecipeExpand);

 // searchForKey() from lab 7:
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
      let currIngred = ingredList[i];
      ingredListArr[i] = currIngred["amount"] + " "
        + currIngred["units"] + " " + currIngred("name");
    }
    return ingredListArr;
  }

  // returns ingredients as single
  // comma-separated string
  // (note that this method returns the ingredients
  // without their amounts/units; getIngredArr(data) does, however)):
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
  function getUSMeasurString(data) {
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


  // get quick recipe info/facts as array:
  /**
   * This function returns an array of the quick facts in following order of its indices:
   * 0: readyInMinutes; 1: servings; 2: dishTypes
   * @param {Object} data assumed to be the single recipe's data
   */
  function getQuickFactsArr(data) {
    // populate array:
    let arrOfQFacts = [];
    arrOfQFacts[0] = "Time: " + searchForKey(data, "readyInMinutes");
    arrOfQFacts[1] = " Servings: " + searchForKey(data, "servings");
    arrOfQFacts[2] = "Dish Types: " + searchForKey(data, "dishTypes");
    return arrOfQFacts;
  }

  // get quick recipe info/facts as string:
  /**
   * This function returns an array of the quick facts in following order of its indices:
   * 0: readyInMinutes; 1: servings; 2: dishTypes
   * @param {Object} data assumed to be the single recipe's data
   */
   function getQuickFactsStr(data) {
    // populate array:
    let strOfQFacts = "";
    strOfQFacts += searchForKey(data, "readyInMinutes") + ", "
      + searchForKey(data, "servings") + ", "
      + searchForKey(data, "dishTypes");

    return strOfQFacts;
  }

  // get serving size:
  /**
   * @param {Object} data a single recipe's data 
   * @returns the serving size of recipe
   */
  function getServingSize(data) {
    return searchForKey(data, "servings");
  }

  // get recipe prep instructions as array:
  /**
   * 
   * @param {Object} data a single recipe's data 
   * @returns an array of the recipe instructions in order
   */
  function getRecInstructionsArr(data) {
    let analyInstructs = searchForKey(data, "analyzedInstructions");
    let steps = analyInstructs["steps"];
    let arrInstructs = [];
    // add instructions to arr:
    for(let i = 0; i < steps.length; i++) {
      arrInstructs[i] = steps["step"];
    }
    return arrInstructs;
  }

  // get recipe prep instructions as string
  // (this is already stored in the .JSON format of spoonacular):
  /**
   * 
   * @param {Object} data a single recipe's data 
   * @returns string of the rec's prep instructons as already stored
   */
  function getRecInstructionsStr(data) {
    return searchForKey(data, "instructions");
  }

  // gets the preparation time ("readyInMinutes") returned as a string
  /**
   * 
   * @param {Object} data a single recipe's data 
   * @returns string of prep time ("readyInMinutes"'s value)
   */
  function getRecTime(data) {
    return searchForKey(data, "readyInMinutes");
  }


  // **NOTE: NUTRITION FACTS DON'T SEEM TO BE STORED
  // IN THE .JSON FILES OF SPOONACULAR,
  // SO NO FUNCTION IS WRITTEN TO POPULATE IT'S
  // DATA HERE. 




/*
  **** IGNORE THE BELOW: IT IS UNUSED ********
*/ 

  /**
   * 
   * @param {Object} data // assume data is passed as object for single recipe 
   */
  /*
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
*/ 

