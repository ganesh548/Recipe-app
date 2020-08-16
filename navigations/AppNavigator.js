import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { RecipeNavigator, AuthNavigator } from './RecipeNavigator';
import StartUpScreen from '../screens/StartUpScreen';

const AppNavigator = () => {
    const isAuth = useSelector(state => !!state.auths.token);
    const didTryAutoLogin = useSelector(state => state.auths.didTryAutoLogin);

    return <NavigationContainer>
                {isAuth && <RecipeNavigator />}
                {!isAuth && didTryAutoLogin && <AuthNavigator />}
                {!isAuth && !didTryAutoLogin && <StartUpScreen />}
           </NavigationContainer>
};

export default AppNavigator;