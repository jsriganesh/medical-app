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

    // 17
export const flexValidation=(qNo)=>{
    var flexList = [
        {"qNo":"0","flex":0.01},
        {"qNo":"1","flex":0.05},
        {"qNo":"2","flex":0.1},
        {"qNo":"3","flex":0.15},
        {"qNo":"4","flex":0.20},
        {"qNo":"5","flex":0.25},
        {"qNo":"6","flex":0.30},
        {"qNo":"7","flex":0.35},
        {"qNo":"8","flex":0.40},
        {"qNo":"9","flex":0.45},
        {"qNo":"10","flex":0.50},
        {"qNo":"11","flex":0.55},
        {"qNo":"12","flex":0.60},
        {"qNo":"13","flex":0.65},
        {"qNo":"14","flex":0.70},
        {"qNo":"15","flex":0.80},
        {"qNo":"16","flex":0.90},
        {"qNo":"17","flex":1},
    ]        

    if(qNo){
        for (const obj of flexList) {
            if(obj.qNo == qNo){
                return  obj.flex
            }
        }
    }
}