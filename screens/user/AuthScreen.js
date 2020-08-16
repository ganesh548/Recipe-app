import React, { useReducer, useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, Image, Alert, KeyboardAvoidingView} from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput, Button, Caption, HelperText } from 'react-native-paper';

import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE='FORM_INPUT_UPDATE';
const ON_SWITCH='ON_SWITCH';

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
    


const AuthScreen = props => {
    const [isLoading, setIsLoading]=useState(false);
    const [login, setLogin]=useState(true);
    const [error, setError]=useState();
    const dispatch = useDispatch();

    const [ formState, dispatchFormState]=useReducer(formReducer, {
        inputValues:{
        email:'',
        password:''
        }, 
        inputValidities:{
        email:false,
        password:false
        }, 
        formIsValid:false
    })

    const onTextChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if(text.trim().length > 0){
            isValid=true; 
        }
        dispatchFormState({type: FORM_INPUT_UPDATE, value:text, isValid: isValid, input:inputIdentifier});
    }
    
    useEffect(() => {
        if(error){
            Alert.alert('An error Occured!', error, [{text:'Okay'}]);
        }
    }, [error])

    const signUpHandler = async () => {
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password));
        } catch(err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    const logInHandler = async () => {
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(authActions.login(formState.inputValues.email, formState.inputValues.password));
        } catch(err) {
            setError(err.message);
        }
        setIsLoading(false);
    };

    
    return(
        <KeyboardAvoidingView style={styles.container} behavior='position'>
            <View style={styles.imageContainer}>
                <Image 
                source={{ uri: 'data:image/jpeg;base64,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'}}
                style={styles.image} />
            </View>
            <View style={styles.inputContainer}>
            <View >
                <TextInput
                keyboardType='default' 
                autoCapitalize='words' 
                returnKeyType='next'
                onChangeText={onTextChangeHandler.bind(this, 'email')}
                value={formState.inputValues.email}
                style={styles.input}
                theme={{ colors: { primary: '#589ded', underlineColor:'transparent',}}}
                placeholder='Email'/>
                {!formState.inputValues.email && <HelperText type="error">Please Enter Email</HelperText>}
            </View>
            <View >
                <TextInput
                keyboardType='default'  
                returnKeyType='next'
                secureTextEntry
                onChangeText={onTextChangeHandler.bind(this, 'password')}
                value={formState.inputValues.password}
                style={styles.input}
                theme={{ colors: { primary: '#589ded', underlineColor:'transparent',}}}
                placeholder='Password'/>
                {!formState.inputValues.password && <HelperText type="error">Please Enter Password</HelperText>}
            </View>
            
            <View style={styles.button}>
            {login ? <Button style={{backgroundColor:'#589ded',borderRadius:10}} onPress={logInHandler} mode="contained">{!isLoading ? "Login": "Logging in..."}</Button> : <Button onPress={signUpHandler} style={{backgroundColor:'#589ded',borderRadius:10}} mode="contained">{!isLoading ? "Sign Up": "Signing Up..."}</Button> } 
            </View>
            <View style={styles.horizontalLine}></View>
            <View style={styles.button}>
            {login ? <Button style={{backgroundColor:'#589ded',borderRadius:10}} onPress={() => {setLogin(false)}} mode="contained">Create New Account</Button> :
             <Button style={{backgroundColor:'#589ded',borderRadius:10}} onPress={() => {setLogin(true)}} mode="contained">Back</Button> }
            </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    image:{
        width:'100%',
        height:'100%'
    },
    imageContainer:{
        width:'100%',
        height:'40%'
    },
    inputContainer:{
        marginTop:20,
        paddingHorizontal:20,
    },
    input:{
        backgroundColor:'white',
        borderBottomColor:'#b6b8a5',
        
    },
    horizontalLine:{
        borderBottomColor:'#b6b8a5',
        borderBottomWidth:1,
        width:'80%',
        marginHorizontal:29
    },
    button:{
        marginVertical:20
    },
    caption:{
        color:'red'
    }
})

export const authScreenOptions = navData => {
    return{
        headerStyle: {
            backgroundColor: '#589ded',
        }
    }    
}

export default AuthScreen;