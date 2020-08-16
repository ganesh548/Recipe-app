import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Title, Paragraph, Button, Subheading } from 'react-native-paper';

const FavRecipe = props => {
    return( 
        <TouchableOpacity onPress={props.view} style={styles.touchable}>
                <Card style={styles.subContainer}>
    
                            <Card.Title title={props.title} />
                            <Card.Actions style={styles.icon}>
                            <Ionicons name="md-heart" size={24}  color="black" onPress={props.removeFav}/>
                            </Card.Actions>
                </Card>  
        </TouchableOpacity>
            
    )
}

const styles=StyleSheet.create({
    touchable:{
        marginTop:10
    },
    subContainer:{
        marginHorizontal:10,
        marginVertical:5,
    },
    icon:{
        padding:20
    }
});

export default FavRecipe;