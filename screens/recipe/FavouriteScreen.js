import React, { useEffect } from 'react';
import { Text, View, FlatList, Image, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import FavRecipe from '../../components/recipe/FavRecipe';
import * as favAction from '../../store/actions/fav';
import { Subheading } from 'react-native-paper';
import { HeaderTitle } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const FavouriteScreen = props => {
    const dispatch=useDispatch();

    const favs=useSelector(state => {
        const transformedRecipe=[];
        for(const key in state.favs.recipes){
            transformedRecipe.push({
                favId:state.favs.recipes[key].id,
                recipeId:state.favs.recipes[key].recipeId,
                recipeTitle:state.favs.recipes[key].recipeTitle,
                recipeimageUrl:state.favs.recipes[key].recipeimageUrl,
            })
        }
        return transformedRecipe;
    });

    useEffect(() => {
        dispatch(favAction.fetchFav());
    }, [dispatch]);

    const popAlert = ( favId ) => {
        Alert.alert( 'Warning',
                    'Are you sure?',
                    [
                        {
                            text: 'ok',
                            onPress: () => {dispatch(favAction.removeFromFav(favId))}
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false });
    };
    return(
        <View style={styles.container}>
            {!Array.isArray(favs)  ? <View style={styles.infoView}><Subheading style={styles.info}>You Dont have any Favourites yet!!</Subheading></View>:
            <FlatList data={favs} keyExtractor={item => item.favId} renderItem={itemData => <FavRecipe 
            title={itemData.item.recipeTitle}
            view={() => props.navigation.navigate('eachRecipe', {recipeId:itemData.item.recipeId, recipeTitle:itemData.item.recipeTitle})}
            removeFav={popAlert.bind(this, itemData.item.favId)}
            /> }/> }
        </View>
    )
}

const styles=StyleSheet.create({
    info:{
        color:'black'    
    },
    infoView:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:120
    },
    container:{
        height:'100%'
    }
});

export const favScreenOptions = navData => {
    return{
        HeaderTitle:'My Favourites',
        headerStyle: {
            backgroundColor: '#589ded',
        }
    
    }    
}


export default FavouriteScreen;