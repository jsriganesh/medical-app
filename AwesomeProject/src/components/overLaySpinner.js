//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

// create a component
const OverLaySpinner = ({ visible }) => {
    return (
        <Spinner visible={visible} />
    );
};

// define your styles
const styles = StyleSheet.create({
   
});

//make this component available to the app
export default OverLaySpinner;
