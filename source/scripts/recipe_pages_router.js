// router.js

/** Some hints for this router:
  *   - the functions being passed in should mostly be stored so that
  *     you can call them later when you want to navigate to a page
  *   - you should be pushing to history (only when the 'popstate' event
  *     hasn't fired) so that you can use forward / backward buttons
  *   - You should be using hashes to update the URL (e.g. 
  *     https://somewebsite.com#somePage) - the hash is the #somePage part.
  *     It's accessible via window.location.hash and using them lets you
  *     easily modify the URL without refreshing the page or anything
  */

 export default class Router {
    static routes = {};
  
    /**
     * Sets up the home function, the page name should always be 'home', which
     * is why no page name variable is passed in.
     * @param {Function} homeFunc The function to run to set the home route
     *                            visually
     */
    constructor(homeFunc) {
      this['home'] = homeFunc;
      // self-coded:
      //this.navigate("home", false);
    }
  
    /**
     * Adds a page name & function so to the router so that the function
     * can be called later when the page is passed in
     * @param {String} page The name of the page to route to (this is used
     *                      as the page's hash as well in the URL)
     * @param {Function} pageFunc The function to run when the page is called
     */
    addPage(page, pageFunc) {
      /**
       * TODO Part 1 - Step 2
       * Just like in the constructor above, store the pageFunc variable inside this
       * router instance using the 'this' keyword. Substitute 'home' for the variable
       * page
       */
      this[page] = pageFunc;
    }
  
    /**
     * Changes the page visually to the page that has been passed in. statePopped
     * is used to avoid pushing a new history state on back/forward button presses
     * @param {String} page The name of the page to route to
     * @param {Boolean} statePopped True if this function is being called from a
     *                              'popstate' event instead of a normal card click
     */
    navigate(page, statePopped) {
      console.log("");
      console.log("");
      console.log(`navigate() function called, requested page: ${page}`);
      /**
       * TODO - Part 1 - Step 4
       * Now, we are going to call the functions that we stored earlier based on 
       * what page is being requested. For this function:
       * 
       *  1. First, check to see if the function exists, if it doesn't log an error
       *     and return out of the function. 'this' is a global variable, so you can 
       *     check to see if it exists nearly the same way you assigned it
       *  2. Create a variable called hash. If page == 'home' set hash to be an empty
       *     string, if page is anything else set it to be the string '#' + page, e.g.
       *     '#ghostCookies'
       *  3. Next, if statePopped is false and window.location.hash does NOT match the
       *     hash that you just made, use history.pushState() to add the current state
       *     and URL + hash to history
       *  4. Finally, call the stored function for the given page
       */
  
      // self-coded:
      // 1.
      console.log("number of pages/properties of this: " + Object.keys(this).length);
      console.log("this's keys:");
      console.log(Object.keys(this));
      console.log("Requested page's function value: " + this[page]);
      let func = this[page];
      // page doesn't exist
      if(typeof this[page] != "function") { // note to self that checking if this[page] == undefined returns true even if the function this[page] is defined
        console.log('ERROR note to self: requested function for page: ', page, ' does not exist');
        return;
      }
  
      // 2.
      let hash="";
      if(page == 'home') {
        hash = "";
      } else {
        hash = '#' + page;
      }
      
      // was undefined for when you start on home page, as it retrieves the current state
      // / top state in the history stack, not of the current web page you on, 
      // so it thus starts as undefined: 
      // let currState = History.state; // current state (state at top of history stack)
      // so need to use something else to get the current url of the page you're actually on
      //let currState = {pageHash: window.location.hash}; // starts with hash of home-page as empty string (automatically I guess)
  
      // 3.
      if(statePopped == false && window.location.hash != hash) {
        let currState = {pageHash: hash};
        console.log("currState: ");
        console.log(currState);
        console.log("hash to go to: " + hash);
  
        console.log("pushing state with pushState().");
        history.pushState(currState, "", hash);
      }
  
      // 4.
      this[page]();
    }
  }


  /**
 * Binds the 'popstate' event on the window (which fires when the back &
 * forward buttons are pressed) so the navigation will continue to work 
 * as expected. (Hint - you should be passing in which page you are on
 * in your Router when you push your state so you can access that page
 * info in your popstate function)
 */
function bindPopstate() {
  /**
   * TODO - Part 1 Step 6
   * Finally, add an event listener to the window object for the 'popstate'
   * event - this fires when the forward or back buttons are pressed in a browser.
   * If your event has a state object that you passed in, navigate to that page,
   * otherwise navigate to 'home'.
   * 
   * IMPORTANT: Pass in the boolean true as the second argument in navigate() here
   * so your navigate() function does not add your going back action to the history,
   * creating an infinite loop
   */
  window.addEventListener('popstate', event => {
    console.log("");
    console.log("*****************");
    console.log("In event listener for popstate.");
    console.log("event for event fired: ");
    console.log(event);
    console.log("Current state: ");
    console.log(event.state);

    if(event.state != undefined) // && event.state["pageHash"] != "home") 
    {
      console.log("State of event fired for popstate: " + event.state["pageHash"]);
      if(event.state["pageHash"] == "") // navigate to home:
      {
        router.navigate("home", true);
      } else {

        router.navigate(event.state["pageHash"].slice(1), true); // to get rid of hash, #, at start of name, slice from index 1 to end of string
                                                                // (also note we don't explicitly add home to history stack, so going
                                                               // to home only happens in the else case here, of when event.state == null,
                                                                // so we'll never be passed just "home", of something without a # as its first
                                                                // character, in this if.

      }
    } else {
      router.navigate("home", true);
    }
  });
}