import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/pages/home';
import LoginPage from './src/pages/loginPage';
import RegistrationPage from './src/pages/registration';
import OverLaySpinner from './src/components/overLaySpinner';
import { connect } from 'react-redux';

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



const RootNavigation = (props) => {
    return (
        <NavigationContainer>
            <HomeNavigation />
            <OverLaySpinner visible={props.spinnerFlag} />
        </NavigationContainer>
    )
}

const mapStateToProps = (state) => ({
    spinnerFlag: state.spinnerReducer.spinnerFlag,
});

export default connect(mapStateToProps)(RootNavigation);