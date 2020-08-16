import * as React from 'react';
import {View, SafeAreaView, KeyboardAvoidingView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RecipeOverviewScreen, { allScreenOptions } from '../screens/recipe/RecipeOverviewScreen';
import RecipeDetailScreen, { detailScreenOptions } from '../screens/recipe/RecipeDetailScreen';
import Colors from '../constants/Colors';
import FavouriteScreen, { favScreenOptions } from '../screens/recipe/FavouriteScreen';
import UserRecipeScreen, { UserRecipeOption } from '../screens/user/UserRecipeScreen';
import EditUserRecipeScreen, { editUserRecipeOption } from '../screens/user/EditUserRecipeScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartUpScreen from '../screens/StartUpScreen';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';


const RStack = createStackNavigator();

export const RecipeStack = () => {
  return (
      <RStack.Navigator>
        <RStack.Screen
          name="Recipes"
          component={RecipeOverviewScreen}
          options={allScreenOptions}
        />
        <RStack.Screen
          name="eachRecipe"
          component={RecipeDetailScreen}
          options={detailScreenOptions}
        />
      </RStack.Navigator>
  );
}

const FStack = createStackNavigator();

export const FavStack = () => {
  return (
      <FStack.Navigator>
        <FStack.Screen
          name="My Favourites"
          options={favScreenOptions}
          component={FavouriteScreen}
        />
        <FStack.Screen
          name="eachRecipe"
          component={RecipeDetailScreen}
          options={detailScreenOptions}
        />
      </FStack.Navigator>
  );
}

const UStack = createStackNavigator();

export const MyRecipe = props => {
  return(
    <UStack.Navigator>
      <UStack.Screen 
        name="My Recipe"
        component={UserRecipeScreen}
        options={UserRecipeOption}
      />
      <UStack.Screen 
        name="Edit Recipe"
        component={EditUserRecipeScreen}
        options={editUserRecipeOption}
      />
    </UStack.Navigator>
  )
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = props => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen 
      name="Authentication"
      component={AuthScreen}/>
    </AuthStackNavigator.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export const RecipeNavigator = props => {
  return(
      <Tab.Navigator 
      tabBarOptions={{
        keyboardHidesTabBar:"true",
        activeTintColor:'black',
        activeBackgroundColor:'#589ded',
        inactiveBackgroundColor:'#589ded'
        }}>
        <Tab.Screen name="Recipes"
          component={RecipeStack}
          options={{
            tabBarIcon:(focused, tintColor) => (
              <MaterialCommunityIcons name="silverware-fork-knife" size={21} />      
            )
          }}
        />
        <Tab.Screen name="Favourites" 
        component={FavStack} 
        options={{
          tabBarIcon:() => (
            <FontAwesome name="heart" size={21} />
          )
        }}
        />
      <Tab.Screen 
      name="My recipes" 
        component={MyRecipe} 
        options={{
          tabBarIcon:() => (

            <MaterialCommunityIcons name="food"  size={21} />
          )
        }}
        />
      </Tab.Navigator>
  )
}