import { DELETE_RECIPE, CREATE_RECIPE, UPDATE_RECIPE, SET_RECIPE } from '../actions/recipe';
import Recipe from '../../models/recipe';
import { compose } from 'redux';


const initialState = {
    availableRecipe:[],
    userRecipe:[]
}

export default (state = initialState, action) => {
    switch(action.type){
        case SET_RECIPE:
            return {
                availableRecipe:action.recipes,
                userRecipe:action.userRecipe
            }
        case DELETE_RECIPE:
            return{
                ...state,
                userRecipe:state.userRecipe.filter(recipe => recipe.id !== action.rid),
                availableRecipe:state.availableRecipe.filter(recipe => recipe.id !== action.rid)
            }
        case CREATE_RECIPE:
            const newRecipe=new Recipe(action.recipeData.id, action.recipeData.ownerId, action.recipeData.title, action.recipeData.imageUrl, action.recipeData.description, action.recipeData.ingredients, action.recipeData.wayToPrepare);
            return{
                ...state,
                availableRecipe:state.availableRecipe.concat(newRecipe),
                userRecipe:state.userRecipe.concat(newRecipe)
            };
        case UPDATE_RECIPE:
            const recipeIndex=state.userRecipe.findIndex(recipe => recipe.id === action.rid);
            const updatedRecipe=new Recipe(action.rid, state.userRecipe[recipeIndex].ownerId, action.recipeData.title, action.recipeData.imageUrl, action.recipeData.description, action.recipeData.ingredients, action.recipeData.wayToPrepare);
            const updatedUserRecipe=[...state.userRecipe];
            updatedUserRecipe[recipeIndex]=updatedRecipe;
            const availableRecipeIndex = state.availableRecipe.findIndex(recipe => recipe.id === action.rid);
            const updatedAvailableRecipe=[...state.availableRecipe];
            updatedAvailableRecipe[availableRecipeIndex]=updatedRecipe;
            return {
                ...state,
                availableRecipe:updatedAvailableRecipe,
                userRecipe:updatedUserRecipe
            };
    }
    return state;
}