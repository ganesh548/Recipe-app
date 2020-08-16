import React, { useCallback, useEffect, useReducer } from 'react';
import { Text, View, ScrollView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import HeaderButton from '../../components/UI/HeaderButton';
import { Button, TextInput } from 'react-native-paper';

import * as recipeActions from '../../store/actions/recipe';

const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if(action.type === FORM_INPUT_UPDATE ){
        const updatedValues={
            ...state.inputValues,
            [action.input]:action.value
        };
        const updatedInputValidities={
            ...state.inputValidities,
            [action.input]:action.isValid
        };
        let updatedFormIsValid=true;
        for(const key in updatedInputValidities){
            updatedFormIsValid=updatedFormIsValid && updatedInputValidities[key];
        }
        return{
            formIsValid:updatedFormIsValid,
            inputValidities:updatedInputValidities,
            inputValues:updatedValues
        };
    }
    return state;
}

const EditUserRecipeScreen = props => {

    const recipeId=props.route.params.recipeId;
    const editedRecipe = useSelector(state => state.recipes.userRecipe.find( recipe => recipe.id === recipeId) );

    const dispatch=useDispatch();

    const [ formState, dispatchFormState]=useReducer(formReducer, {
                                inputValues:{
                                title:editedRecipe ? editedRecipe.title : '',
                                imageUrl:editedRecipe ? editedRecipe.imageUrl : '',
                                desc:editedRecipe ? editedRecipe.description : '',
                                ingredients:editedRecipe ? editedRecipe.ingredients : '',
                                wayToPrepare:editedRecipe ? editedRecipe.wayToPrepare : ''
                                }, 
                                inputValidities:{
                                title:editedRecipe ? true : false,
                                imageUrl:editedRecipe ? true : false,
                                desc:editedRecipe ? true : false,
                                ingredients:editedRecipe ? true : false,
                                wayToPrepare:editedRecipe ? true : false
                                }, 
                                formIsValid:editedRecipe ? true : false
                            })
    const submitHandler = useCallback(() => {
        if(!formState.formIsValid){
            return;
        }
        if(editedRecipe)
        {
            dispatch(recipeActions.updateRecipe(recipeId, formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.desc, formState.inputValues.ingredients, formState.inputValues.wayToPrepare));
        }
        else
        {
            dispatch(recipeActions.createRecipe(formState.inputValues.title, formState.inputValues.imageUrl, formState.inputValues.desc, formState.inputValues.ingredients, formState.inputValues.wayToPrepare));
        }
        props.navigation.goBack();
    }, [dispatch, recipeId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const onTextChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if(text.trim().length > 0){
            isValid=true; 
        }
        dispatchFormState({type: FORM_INPUT_UPDATE, value:text, isValid: isValid, input:inputIdentifier});
    }

    return (
        <KeyboardAvoidingView behavior="position" style={styles.container}>
        <ScrollView>
            <View style={styles.form}>
                    <TextInput 
                    style={styles.input} 
                    value={formState.inputValues.title} 
                    onChangeText={onTextChangeHandler.bind(this, 'title')} 
                    keyboardType='default' 
                    autoCapitalize='words' 
                    returnKeyType='next'
                    mode="outlined"
                    label="Title"
                    multiline
                    theme={{ colors: { primary: '#589ded', underlineColor:'transparent',}}}
                    />
                    <TextInput style={styles.input} 
                    value={formState.inputValues.desc} 
                    onChangeText={onTextChangeHandler.bind(this, 'desc') } 
                    keyboardType='default' 
                    returnKeyType='next'
                    mode="outlined"
                    label="Description"
                    multiline
                    theme={{ colors: { primary: '#589ded', underlineColor:'transparent',}}}
                    />
                    <TextInput style={styles.input} 
                    value={formState.inputValues.ingredients} 
                    onChangeText={onTextChangeHandler.bind(this, 'ingredients') } 
                    keyboardType='default' 
                    returnKeyType='next'
                    mode="outlined"
                    label="Ingredients"
                    multiline
                    theme={{ colors: { primary: '#589ded', underlineColor:'transparent',}}}
                    /> 
                    <TextInput style={styles.input} 
                    value={formState.inputValues.imageUrl} 
                    onChangeText={onTextChangeHandler.bind(this, 'imageUrl') } 
                    keyboardType='default' 
                    returnKeyType='next'
                    mode="outlined"
                    label="Image url"
                    multiline
                    theme={{ colors: { primary: '#589ded', underlineColor:'transparent',}}}
                    />
                    <TextInput style={styles.input} 
                    value={formState.inputValues.wayToPrepare} 
                    onChangeText={onTextChangeHandler.bind(this, 'wayToPrepare')} 
                    keyboardType='default' 
                    returnKeyType='done'
                    mode="outlined"
                    label="Steps To Prepare"
                    theme={{ colors: { primary: '#589ded', underlineColor:'transparent',}}}
                    multiline
                    />
            </View>
            <View style={styles.buttonConatiner}>
                <Button style={styles.button} mode="contained" onPress={props.route.params.submit} >Save</Button>
                {editedRecipe && <Button icon="delete" mode="contained" onPress={() => {dispatch(recipeActions.deleteRecipe(recipeId));}} style={styles.button}>Delete</Button>}
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles=StyleSheet.create({
    form:{
        margin:20
    },
    input:{
        marginVertical:10,
        backgroundColor:'white'
    },
    container:{
        backgroundColor:'white',
        width:'100%',
        height:'100%'
    },
    buttonConatiner:{
        flexDirection:'row',
        justifyContent:'center', 
        marginBottom:20
    },
    button:{
        marginHorizontal:20,
        borderRadius:10,
        backgroundColor:'#589ded'
    }
});

export const editUserRecipeOption = navData => {
    return {
        headerTitle:navData.route.params.recipeTitle === 'Add Recipe' ? 'Add Recipe' : `Edit  ${navData.route.params.recipeTitle}`,
        headerStyle: {
            backgroundColor: '#589ded',
        }
    }
}

export default EditUserRecipeScreen;