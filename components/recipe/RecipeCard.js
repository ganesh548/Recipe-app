import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const RecipeCard = props => {
    return(
        <TouchableOpacity onPress={props.view}>
            <View >
                <Card >
                    <Card.Cover style={styles.imageContainer} source={{uri: props.image}}/>
                    <Card.Title title={props.title} subtitle="By:"/>
                    <Card.Actions style={styles.action}>
                    {props.children}
                    </Card.Actions>
                </Card>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    details:{
        alignItems:'center',
        height:'40%',
        padding:15
    },
    imageContainer:{

        // height:'70%',

    },
    action:{
        paddingBottom:20
    }
})

export default RecipeCard;