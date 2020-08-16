import Fav from '../../models/fav';

export const ADD_TO_FAV='ADD_TO_FAV';
export const REMOVE_FROM_FAV='REMOVE_FROM_FAV';
export const SET_FAV='SET_FAV';

export const addToFav = (id, title, imageUrl) => {
    return async (dispatch, getState) => {
        const token=getState().auths.token;
        const userId=getState().auths.userId;
        const response = await fetch(`LINK/favs/${userId}.json?auth=${token}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                id,
                title,
                imageUrl
            })
        });
        const resData=await response.json();
        dispatch({ type: ADD_TO_FAV, recipe: resData});
    }
}

export const fetchFav = () => {
    return async (dispatch, getState) => {
        const token=getState().auths.token;
        const userId=getState().auths.userId;
        const response=await fetch(`LINK/favs/${userId}.json?auth=${token}`);  
        if(!response.ok){
            return;
        }

        const resData=await response.json();
        const loadedFavs=[];
        for(const key in resData){
            loadedFavs.push(new Fav(key, resData[key].id, resData[key].title, resData[key].imageUrl, resData[key].userId));
        }
        dispatch({type:SET_FAV, recipes:loadedFavs});
    }
}

export const removeFromFav = favId => {
    return async (dispatch, getState) => {
        const token=getState().auths.token;
        const userId=getState().auths.userId;
        await fetch(`LINK/favs/${userId}/${favId}.json?auth=${token}`, {
            method:'DELETE'}); 
    }
    return { type:REMOVE_FROM_FAV, rid: recipeId };
}