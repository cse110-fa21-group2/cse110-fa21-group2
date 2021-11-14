import { Router } from "./recipe_pages_router"

/**
 * 
 * @param {Element} rec the recipe to prepare for clicking
 * @param {String} recPageName the name of page for that recipe
 */
function prepRecipeForClick(rec, recPageName) {
    rec.addEventListener('click', event => {
        Router.navigate(recPageName, false);
    })
}

