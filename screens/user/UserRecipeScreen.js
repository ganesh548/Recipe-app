import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';

import RecipeCard from '../../components/recipe/RecipeCard';
import Recipe from '../../models/recipe';
import HeaderButton from '../../components/UI/HeaderButton';
import { FAB } from 'react-native-paper';

const UserRecipeScreen = props => {
    
    const userRecipes=useSelector(state => state.recipes.userRecipe); 
    const dispatch=useDispatch();

    return(
        <View>
            
            <FlatList 
            data={userRecipes}
            key={item => item.id}
            renderItem={itemData => (
            <RecipeCard image={itemData.item.imageUrl} 
            desc={itemData.item.description} 
            title={itemData.item.title} 
            view={() => props.navigation.navigate('Edit Recipe', {recipeId:itemData.item.id, recipeTitle:itemData.item.title})}
            >
            </RecipeCard>
            )
            }
            />
            <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => {
                props.navigation.navigate('Edit Recipe', {recipeTitle:'Add Recipe'});
            }}
            />
        </View>
        
    );
} 

export const UserRecipeOption = navData => {
    return{
        headerStyle: {
            backgroundColor: '#589ded',
        }
    }     
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 5,
        top: 520,
        backgroundColor:"#589ded",
    }
})

export default UserRecipeScreen;