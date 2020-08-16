import React, { useState } from 'react';
import {Text, View } from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import reduxThunk from 'redux-thunk';

import recipeReducers from './store/reducers/recipe';
import  { MyStack, MyTab } from './navigations/RecipeNavigator';
import favReducers from './store/reducers/fav';
import authReducers from './store/reducers/auth';
import AppNavigator from './navigations/AppNavigator';

const rootReducer = combineReducers({
  recipes:recipeReducers,
  favs:favReducers,
  auths:authReducers
});

const store=createStore(rootReducer, applyMiddleware(reduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'header':require('./assets/fonts/Oswald-VariableFont_wght.ttf'),
    'title':require('./assets/fonts/FrankRuhlLibre-Bold.ttf'),
    'texts':require('./assets/fonts/FrankRuhlLibre-Medium.ttf')
  })
}
export default function App() {
  
  const [fontLoaded, setFontLoaded]=useState(false);

  if(!fontLoaded){
    return(
      <AppLoading startAsync={fetchFonts} onFinish={() => {setFontLoaded(true)}} />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

