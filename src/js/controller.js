import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  module.hot.accpet;
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //0) updates results view to mark selected search results
    resultsView.update(model.getSearchResultsPage())
    //1) loading recipe
    await model.loadRecipe(id);
    //2) rendering recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const conrolSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2) load search results
    await model.loadSearchResults(query);
    //3) render results
    resultsView.render(model.getSearchResultsPage());

    //4) render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings
  model.updateServings(newServings);
  // update the view as well
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(conrolSearchResults);
  paginationView.addHandlerPagination(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
};
init();
