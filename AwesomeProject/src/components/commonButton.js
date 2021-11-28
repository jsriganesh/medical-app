//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {colors}  from '../utils/colors';
import {FontFamily} from '../utils/fontFamily';
import { connect } from "react-redux";
import { ActionTypes } from '../redux/action/actionList';



function getUnique(arr) {

    let uniqueArr = [];

    // loop through array
    for (let i of arr) {
        if (uniqueArr.indexOf(i) === -1) {
            uniqueArr.push(i);
        }
    }

    return (uniqueArr)
}

const mapStateToProps = (state) => ({
    validateQuestion: state.selectedValidationQuestion.validateQuestion,
    backNavigationList: state.backNavigationListReducer.backNavigationList,
});


const CommonButton = ({ data, changeIndex, index, allQuestions, validateQuestion, dispatch, backNavigationList,errorMessageFunction }) => {


    function backNavigationLists() {
        var backList = backNavigationList

        backList.push(index);
        var filtered = getUnique(backList)
        dispatch({ type: ActionTypes.BACK_NAVIGATIONS, payload: filtered })
    }


    function doNavigationButtonValidation(index) {
        if (data && data.nextQuestionIndex) {
            changeIndex(data.nextQuestionIndex)
            backNavigationLists(data.nextQuestionIndex)
        } else if (data && data.dataType == "Select" &&
            data.answer && data.answer.length > 0 &&
            data.answer[0].nextQuestionIndex
        ) {
            changeIndex(data.answer[0].nextQuestionIndex)
            backNavigationLists(data.answer[0].nextQuestionIndex)
        } else {
        }

    }


    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            if(checkMandatory(data,errorMessageFunction)){
                doNavigationButtonValidation(index)
            }else{

            }
            
        }}>
            <Text style={styles.buttonTextStyle}>{data.buttonName ? data.buttonName : "ENTER"}</Text>
        </TouchableOpacity>
    );
};



const checkMandatory =(data,callback)=>{
    if(data.mandatory){
        if(data.dataType == "Select"){
            if(data.minSelect <= data.answer.length  && data.maxSelect >= data.answer.length){
                return true
            }else{
                var msg = "Please select the Options,"+" you need to select minimum "+data.minSelect +" and maximum "+ data.maxSelect
                callback(msg,true)
                // alert(msg)
                return false
            }
        }else{
            // if(data.dataType == "Number" || data.dataType == "String" ){
            // }
            if(data.answer !== ""){
                return true
            }else{
                // alert("Plase Enter the answer")
                callback("Plase Enter the answer",true)
                return false
            }
        }
    }else{
        return true
    }
}

// define your styles
const styles = StyleSheet.create({
    questionFontStyle: {
        color: colors.questionFontColor,
        fontSize: 24,
        fontFamily: FontFamily.fontBold

    },
    questionMessageFontStyle: {
        color: colors.messageColor,
        fontSize: 18,
        fontFamily: FontFamily.fontRegular
    },

    textBoxStyle: {
        width: "100%",
        height: 60,
        borderBottomWidth: 2,
        borderBottomColor: colors.textBoXFontColor,
        color: colors.textBoXFontColor,
        fontSize: 20,
        paddingHorizontal: 10

    },
    buttonStyle: {
        backgroundColor: colors.themeColor,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 5,
        alignSelf: "center",
        marginVertical: 20
        // aliginContent:"flex-start",
        // alignSelf:"flex-start"
    },
    buttonTextStyle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",


    }
});


export default connect(mapStateToProps)(CommonButton)
