//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActionTypes } from '../redux/action/actionList';


export const ErrorAlert = (message) => {
    alert(message)
};

export const SuccessAlert = (message) => {
    alert(message)
};

export const changeSpinnerFlag = (props, flag) => {
    const { dispatch } = props;
    dispatch({ type: ActionTypes.SPINNER_FLAG, payload: flag })
}

