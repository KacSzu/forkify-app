import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if(module.hot){
  module.hot.accpet
}
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

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
    resultsView.renderSpinner()
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2) load search results
    await model.loadSearchResults(query);
    //3) render results
    resultsView.render(model.state.search.results)
    
  } catch (err) {
    console.log(err);
  }
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(conrolSearchResults);
};
init();
