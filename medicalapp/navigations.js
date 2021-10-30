import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';
import LoginPage from './src/pages/loginPage';

const Stack = createNativeStackNavigator();



const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"LoginPage"}>
            <Stack.Screen name={"LoginPage"} component={LoginPage} />
            <Stack.Screen name={"Home"} component={Home} />

            
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