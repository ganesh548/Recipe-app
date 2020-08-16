import { ADD_TO_FAV, REMOVE_FROM_FAV, SET_FAV } from '../actions/fav';
import Fav from '../../models/fav';
import { DELETE_RECIPE } from '../actions/recipe';

const initialState = {
    recipes:{}
}

export default(state = initialState, action) => {
    switch(action.type) {
        case SET_FAV:
            return {
                recipes:action.recipes
            }
        case ADD_TO_FAV: 
            const addedRecipe=action.recipe;
            const recipeTitle=addedRecipe.title;

            const newFavRecipe=new Fav(addedRecipe.id, addedRecipe.title, addedRecipe.imageUrl);
            return{
                ...state,
                recipes:{...state.recipes, [addedRecipe.id]:newFavRecipe}
            };
        case REMOVE_FROM_FAV:
            const updatedFavRecipe = {...state.recipes};
            delete updatedFavRecipe[action.rid];
            return {
                ...state,
                recipes:updatedFavRecipe
            };
        case DELETE_RECIPE:
            if(!state.recipes[action.rid])
            {
                return state;
            }
            const updatedRecipe={...state.recipes};
            delete updatedRecipe[action.rid];
            return{
                ...state,
                recipes:updatedRecipe
            }
    }
    return state;
}