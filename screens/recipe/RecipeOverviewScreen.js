import React, { useState, useEffect } from 'react';
import { FlatList, Text, ToastAndroid, View, StyleSheet, Alert,Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderTitle } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { AntDesign } from '@expo/vector-icons';
import { Button, FAB } from 'react-native-paper';

import RecipeCard from '../../components/recipe/RecipeCard';
import * as favActions from '../../store/actions/fav';
import * as recipesAction from '../../store/actions/recipe';
import HeaderButton from '../../components/UI/HeaderButton';
import * as authActions from '../../store/actions/auth';
import recipe from '../../store/reducers/recipe';

const showToastWithGravityAndOffset = () => {
    ToastAndroid.showWithGravityAndOffset(
      "Added to Favourites!!",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      ToastAndroid.CENTER,
      30,
      10,
    );
};



const recipeOverviewScreen = props => {
    const recipes=useSelector(state => state.recipes.availableRecipe);
    const dispatch = useDispatch();

    // useEffect(()=> {
    //     const willFocusSub = props.navigation.addListener('willFocus', () => {
    //         dispatch(recipesAction.fetchRecipes());
    //     });
    //     return () => {
    //         willFocusSub.remove();
    //     }
    // },[dispatch]);

    useEffect(() => {
        dispatch(recipesAction.fetchRecipes());
        dispatch(favActions.fetchFav());
    }, [dispatch]);
    
    const popAlert = () => {
        Alert.alert( 'Warning',
                    'Are you sure?You want to Logout?',
                    [
                        {
                            text: 'yes',
                            onPress: () => {dispatch(authActions.logout())}
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false });
    };

    return(
        <View>
            <FlatList 
            data={recipes} 
            keyExtractor={item => item.id} 
            renderItem={itemData => 
            <RecipeCard 
            image={itemData.item.imageUrl} 
            desc={itemData.item.description} 
            title={itemData.item.title} 
            view={() => props.navigation.navigate('eachRecipe', {recipeId:itemData.item.id, recipeTitle:itemData.item.title})}
            >
            </RecipeCard>
            } 
            />
            <FAB
                style={styles.fab}
                icon="logout"
                onPress={popAlert}
            />
        </View>
    );
}

const styles=StyleSheet.create({
    chipContainer:{
    },
    chips:{
        marginVertical:20,
    },
    chip:{
        maxWidth:140,
        marginLeft:10
    },
    chipText:{
        width:'100%'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 5,
        top:Dimensions.get("window").width*1.32,
        backgroundColor:'#589ded'
    }
})

export const allScreenOptions = navData => {
    return{
        headerStyle: {
            backgroundColor: '#589ded',
        }
    }    
}

export default recipeOverviewScreen;