import { AsyncStorage } from 'react-native';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT'; 
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

let timer;

export const setDidTryAL = () => {
    return {type: SET_DID_TRY_AL};
}

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime));
        dispatch({ type: AUTHENTICATE, userId:userId, token:token });
    };
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=API_KEY', 
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken: true
            })
        });

        const resData= await response.json();

        if(!response.ok){
            throw new Error('Something went wrong');
        }

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000));
        const expirationDate =new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=API_KEY', 
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email:email,
                password:password,
                returnSecureToken: true
            })
        });

        const resData= await response.json();
        if(!response.ok){
            throw new Error('Something went wrong');
        }

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn)*1000));
        const expirationDate =new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToStorage(resData.idToken, resData.localId, expirationDate);
    }
}

export const logout = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type:LOGOUT };
}

const clearLogoutTimer = () => {
    if(timer){
        clearTimeout(timer);
    }
}

const setLogoutTimer = expirationDate => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationDate);
    };
};

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token:token,
        userId:userId,
        expiryDate:expirationDate.toISOString()
    }));
}