import React, {useEffect } from 'react';
import { ScrollView, Text, View, Image, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Paragraph, Button, Subheading } from 'react-native-paper';


import * as favActions from '../../store/actions/fav';

const RecipeDetailScreen = props => {
    const recipeId = props.route.params.recipeId;
    const selectedRecipe = useSelector(state => state.recipes.availableRecipe.find(recipe => recipe.id === recipeId ))
    const dispatch=useDispatch();
    const popAlert = () => {
        Alert.alert( 'Warning',
                    'Are you sure?',
                    [
                        {
                            text: 'ok',
                            onPress: () => {dispatch(favActions.removeFromFav(recipeId))}
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel'
                        },
                    ],
                    { cancelable: false });
    };
    return (
        <ScrollView style={styles.container}>
            <Card >
                <Card.Cover source={{ uri: selectedRecipe.imageUrl}} />
                <Card.Title title={selectedRecipe.title} subtitle="posted:6 months ago"/>
                <View style={styles.horizontalLine}></View>
                <Card.Actions style={styles.iconContainer}>
                    <Ionicons name="md-heart-empty" size={25} color="black" onPress={() => {dispatch(favActions.addToFav(selectedRecipe.id, selectedRecipe.title, selectedRecipe.imageUrl))}} style={styles.icon}/>
                    <Ionicons name="md-heart" size={24} color="black" onPress={popAlert} style={styles.icon}/>
                    {/* <Ionicons name="md-share" size={25} color="green" onPress={() => {} } style={styles.icon}/> */}
                </Card.Actions>
                <View style={styles.horizontalLine}></View>
                <Card.Content>
                    <View style={styles.infoView}>
                        <Paragraph>{selectedRecipe.description}</Paragraph>
                    </View>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.infoView}>
                        <Subheading>Ingredients</Subheading>
                        <Paragraph>{selectedRecipe.ingredients}</Paragraph>
                        </View>
                    <View style={styles.horizontalLine}></View>
                    <View style={styles.infoView}>
                        <Subheading>How to make {selectedRecipe.title}</Subheading>
                        <Paragraph>{selectedRecipe.wayToPrepare}</Paragraph>
                    </View>
                </Card.Content>   
            </Card>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    
    horizontalLine:{
        borderBottomWidth:1,
        borderBottomColor:'#b6b8a5'
    },
    icon:{
        marginHorizontal:20
    },
    iconContainer:{
        paddingVertical:20
    },
    infoView:{
        minHeight:80,
        paddingVertical:20
    },
    container:{
        height:'100%',
        backgroundColor:'white'
    }
});

export const detailScreenOptions = navData => {
    return{
        title:navData.route.params.recipeTitle,
        headerStyle: {
            backgroundColor: '#589ded',
        }
    }
}

export default RecipeDetailScreen;