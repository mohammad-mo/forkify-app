import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'

// Older browser support
import 'regenerator-runtime/runtime' // polyfilling async/await
import 'core-js/stable' //polyfilling everything else

if(module.hot)
{
  module.hot.accept()
}

const controllRecipes = async () =>
{
  try
  {
    const id = window.location.hash.slice(1)

    if (!id) return
    
    recipeView.renderSpinner()

    // 1) Loading recipe
    await model.loadRecipe(id)
    
    // 2) Rendering recipe
    recipeView.render(model.state.recipe)
    // const renderRecipeView = new recipeView(model.state.recipe)
  }
  catch(err)
  {
    recipeView.renderError()
  }
}
controllRecipes()

const controllSearchResults = async () =>
{
  try
  {
    resultsView.renderSpinner()

    // 1) Get search query
    const query = searchView.getQuery()
    if(!query) return

    // 2) Load search results
    await model.loadSearchResults(query)

    // 3) Render results
    console.log(model.state.search.results)
    resultsView.render(model.state.search.results)
  }
  catch(err)
  {
    console.error(err)
  }
}

const init = () =>
{
    recipeView.addHandlerRender(controllRecipes)
    searchView.addHandlerSearch(controllSearchResults)
}
init()