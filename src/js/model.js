import { async } from "regenerator-runtime"
import { API_URL } from "./config"
import { getJSON } from "./helpers"
import { RESULTS_PER_PAGE } from "./config"

export const state =
{
    recipe: {},
    search: 
    {
        query: '',
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1
    }
}

export const loadRecipe = async (id) =>
{
    try
    {
        const data = await getJSON(`${API_URL}${id}`)

        const { recipe } = data.data
        state.recipe =
        {
          id: recipe.id,
          title: recipe.title,
          publisher: recipe.publisher,
          sourceUrl: recipe.source_url,
          image: recipe.image_url,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ingredients: recipe.ingredients
        }
    }
    catch(err)
    {
        console.error(`${err} ☠️☠️☠️`)
        // throw the error to controller.js
        throw err
    }
}

export const loadSearchResults = async (query) =>
{
    try
    {
        state.search.query = query

        const data = await getJSON(`${API_URL}?search=${query}`)
        // console.log(data)

        state.search.results = data.data.recipes.map(rec =>
            {
                return {
                    id: rec.id,
                    title: rec.title,
                    publisher: rec.publisher,
                    image: rec.image_url
                }
            })
            // console.log(state.search.results)
    }
    catch(err)
    {
        console.error(`${err} ☠️☠️☠️`)
        // throw the error to controller.js
        throw err
    }
}

export const getSearchResultsPage = (page = state.search.page) =>
{
    state.search.page = page

    const start = (page - 1) * state.search.resultsPerPage // 0
    const end = page * state.search.resultsPerPage // 9

    return state.search.results.slice(start, end)
}