import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';

const Stack = createNativeStackNavigator();



const HomeNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={"Home"}>
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