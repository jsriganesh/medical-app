import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';
import LoginPage from './src/pages/loginPage';
import RegistrationPage from './src/pages/registration';

const Stack = createNativeStackNavigator();



const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"LoginPage"}>
            <Stack.Screen name={"LoginPage"} component={LoginPage} />
            <Stack.Screen name={"Home"} component={Home} />
            <Stack.Screen name={"RegistrationPage"} component={RegistrationPage} />

            
        </Stack.Navigator>
    )
}



const RootNavigation = () => {
    return (
        <NavigationContainer>
            <HomeNavigation />
        </NavigationContainer>
    )
}

export default RootNavigation;