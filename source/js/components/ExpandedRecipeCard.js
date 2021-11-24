import getRouter from '/source/js/main.js';

// RecipeExpand.js
class RecipeExpand extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Create styles and root element
      const styles = document.createElement('style');

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

      // add dummy <article> wrapper element
      // for content of custom element; leave blank:
      let articleEl = document.createElement("article");
      articleEl.innerHTML = ""; // empty/blank
  
      // Append the two <style> and <article> elements to the shadow root:
      this.shadowRoot.append(styles);
      this.shadowRoot.append(articleEl);
    }
  
    /**
     * Sets the recipe that will be used inside the <recipe-expand> element.
     * Overwrites the previous recipe, fair warning.
     * @param {Object} data assume data is the JSON/JS data for a single recipe
     */
    set data(data) {
      this.json = data;

      // reset page so that it doesn't keep on having
      // subsequent clicks add to content already there:
      let articleEl = this.shadowRoot.querySelector("article");
      articleEl.remove();

    /*
      ** CREATING HTML MANUALLY WITH JS, AS ASSIGNING TO article.innerHTML
      WITH THAT BIG A STRING SEEMS TO CAUSE ISSUES (per OH) **
    */ 

    // * Reset HTML: *
    // wrapper (article as outermost wrapper of this custom element):
    articleEl = document.createElement("article");

    let secEl = "";
    let secElExpRecs = document.createElement("section");
    secElExpRecs.setAttribute("class", "expanded-recipe");
    articleEl.appendChild(secElExpRecs);

    // declarations (due to previous edits):
    let divEl = document.createElement("div");
    let imgEl = "";
    let spanEl = "";
    let navEl = "";
    divEl.setAttribute("class", "nav-logo");

    // links to other pages
    // (NOTE: UPDATE THIS AS ARE USING ROUTER)
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

    // search-bar:
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
    secElHeader.setAttribute("id", "header");

    buttonEl = document.createElement("button"); 
    buttonEl.innerHTML = "Return";
    buttonEl.addEventListener("click",logicPopstateForRouter);
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
    let ulEl = document.createElement("ul");
    let liRatStatsEl = document.createElement("li");
    liRatStatsEl.setAttribute("class", "rating-stats");
    let liRatStatsEl2 = document.createElement("li");
    liRatStatsEl2.setAttribute("class", "rating-stats");
    spanEl = document.createElement("span");
    spanEl.setAttribute("class", "divider");
    liRatStatsEl.appendChild(spanEl);
    ulEl.appendChild(liRatStatsEl);
    ulEl.appendChild(liRatStatsEl2);

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
    pEl.innerHTML = "Ingredients: ";
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
    pEl.innerHTML = "Quick Facts:";
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
    pEl.innerHTML = "Measurements:";
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
    mainEl.appendChild(secElSubHeader);

    // Recipe preparation/cooking instructions:
    secElHeader = document.createElement("section");
    secElHeader.setAttribute("class", "body");
    divEl = document.createElement("div");
    divEl.setAttribute("class", "sub-body");
    pEl = document.createElement("p");
    pEl.setAttribute("class", "subtitle");
    pEl.innerHTML = "Steps:";
    let olEl = document.createElement("ol");
    olEl.setAttribute("class", "steps");
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
    pEl.innerHTML = "Nutrition Facts: ";
    buttonEl = document.createElement("button");
    buttonEl.innerHTML = "Full Nutrition";
    divEl.appendChild(pEl);
    divEl.appendChild(buttonEl);
    secElHeader.appendChild(divEl);
    mainEl.appendChild(secElHeader);

    // append to shadow DOM:
    this.shadowRoot.append(articleEl);

    // set title:
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
    const recImgSrc = getImgSrc(data);
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
    const qfUlEl = this.shadowRoot.querySelector("ul.facts"); // qf list <ul>
    // console.log("qfUlEl: " + qfUlEl);
    const qfArr = getQuickFactsArr(data); // get quick facts array
    // console.log("qfArr: " + qfArr);
    for(let i = 0; i < qfArr.length; i++) {
      let qfListItem = document.createElement("li");
      qfListItem.setAttribute("class", "item");
      qfListItem.innerHTML = qfArr[i];
      qfUlEl.appendChild(qfListItem);
    }
    
    // Set/create steps list
    // (create list items, <li>'s, for individual steps):
    const stepOlEl = this.shadowRoot.querySelector('div.sub-body > ol.steps'); // step list <ol>
    // console.log("stepOlEl: " + stepOlEl);
    const stepsArr = getRecInstructionsArr(data);
    // console.log("stepsArr: " + stepsArr);
    for(let i = 0; i < stepsArr.length; i++) {
      let stepListItem = document.createElement("li");
      stepListItem.setAttribute("class", "steps");
      stepListItem.innerHTML = stepsArr[i];
      stepOlEl.appendChild(stepListItem);
    }
    
  } 

    // return data of current expanded recipe:
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
    return data["image"]; //searchForKey(data, "image");
  }
  
  // returns array of ingredients
  function getIngredArray(data) {
    // an array of ingredient objects:
    let ingredList = searchForKey(data, "extendedIngredients");
    let ingredListLen = ingredList.length;
    let ingredListArr = []
    // populate ingredients list (append each time):
    for(let i = 0; i < ingredListLen; i++) {
      let currIngred = ingredList[i];
      ingredListArr[i] = currIngred["amount"] + " "
        + currIngred["unit"] + " " + currIngred["name"];
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
    return data["summary"];/// searchForKey("summary");
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
    arrOfQFacts[0] = "Time: " + searchForKey(data, "readyInMinutes") + " minutes.";
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
    let analyInstructs = data["analyzedInstructions"];
    // console.log("analyInstructs: " + analyInstructs);
    let steps = analyInstructs[0]["steps"];
    // console.log("steps: " + steps);
    let arrInstructs = [];
    // add instructions to arr:
    for(let i = 0; i < steps.length; i++) {
      arrInstructs[i] = steps[i]["step"];
    }
    // console.log("arrInstructs: " + arrInstructs);
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



  /**
   * Handles popstate event as back browser arrow click
   * @param {Object} event 
   */
  function logicPopstateForRouter(event) {
    window.history.back();
  }
