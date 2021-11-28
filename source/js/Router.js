/* eslint-disable no-restricted-globals */
export default class Router {
  /**
   * Adds a page name & function so to the router so that the function
   * can be called later when the page is passed in
   * @param {String} page The name of the page to route to (this is used
   *                      as the page's hash as well in the URL)
   * @param {Function} pageFunc The function to run when the page is called
   */
  addPage(page, pageFunc) {
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
    if (this[page] === undefined) {
      // eslint-disable-next-line no-console
      console.error('Page not found');
      return;
    }

    const hash = page === 'landing' ? '' : `#${page}`;

    if (!statePopped && window.location.hash !== hash) {
      history.pushState({ page }, document.title, `/${hash}`);
    }

    this[page]();
  }
}
