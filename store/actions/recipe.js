import Recipe from '../../models/recipe';

export const DELETE_RECIPE='DELETE_RECIPE';
export const CREATE_RECIPE='CREATE_RECIPE';
export const UPDATE_RECIPE='UPDATE_RECIPE';
export const SET_RECIPE='SET_RECIPE';

export const fetchRecipes = () => {
    return async (dispatch, getState) => {
        const userId=getState().auths.userId;
        try{
            const response = await fetch('LINK/recipes.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData=await response.json();
            const loadedRecipes=[];

            for(const key in resData){
                loadedRecipes.push(new Recipe(key, resData[key].userId, resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].ingredients, resData[key].wayToPrepare));
            };
            dispatch({type:SET_RECIPE, recipes:loadedRecipes, userRecipe:loadedRecipes.filter(recipe => recipe.ownerId === userId)});
        }catch (err) {
            throw err;
          }
    
    };
};

export const deleteRecipe = recipeId => {
    return async (dispatch, getState) => {
        const token=getState().auths.token;
        await fetch(`LINK/recipes/${recipeId}.json?auth=${token}`, {
            method:'DELETE'}); 
        dispatch({ type: DELETE_RECIPE, rid: recipeId });
    }
    
}

export const createRecipe = (title, imageUrl, description, ingredients, wayToPrepare) => {
    return async (dispatch, getState) => {

        const token=getState().auths.token;
        const userId=getState().auths.userId;
        const response = await fetch(`LINK/recipes.json?auth=${token}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                userId,
                imageUrl,
                description,
                ingredients,
                wayToPrepare
            })
        })
        const resData=await response.json();
        console.log(resData);
        dispatch({
            type:CREATE_RECIPE, recipeData:{
            id:resData.name,
            ownerId: userId,
            title,
            imageUrl,
            description,
            ingredients,
            wayToPrepare
        }});
    }
    
}

export const updateRecipe = (id, title, imageUrl, description,  ingredients, wayToPrepare) => {
    return async (dispatch, getState) => {
        
        const token=getState().auths.token;
        await fetch(`LINK/recipes/${id}.json?auth=${token}`, {
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title,
                imageUrl,
                description,
                ingredients,
                wayToPrepare
            })
        })
        
        return{type:UPDATE_RECIPE, rid:id, recipeData:{
            title,
            imageUrl,
            description,
            ingredients,
            wayToPrepare
        }};
    };
    
}