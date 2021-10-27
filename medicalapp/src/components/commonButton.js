//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import FontFamily from '../utils/fontFamily';
import theme from '../utils/theme';
import { connect } from "react-redux";
import { ActionTypes } from '../redux/action/actionList';


const mapStateToProps = (state) => ({
    validateQuestion: state.selectedValidationQuestion.validateQuestion,
});

const CommonButton = ({ data, changeIndex, index, allQuestions, validateQuestion, dispatch }) => {



    function doNavigationButtonValidation(index) {
        if (allQuestions[index + 1] && allQuestions[index + 1].validation && allQuestions[index + 1].validation.length > 0) {
            if (allQuestions[index + 1].validation.length > 1) {
                console.log("length is > 1")
                for (let ind = 0; ind < allQuestions.length; ind++) {
                    let checIndex = index + 1
                    if (
                        (
                            allQuestions[checIndex] && allQuestions[checIndex].validation && allQuestions[checIndex].validation.length > 0
                            &&
                            validateQuestion.parentQuestionNo == allQuestions[checIndex].validation[0].parentQuestionNo
                            &&
                            validateQuestion.questionNo == allQuestions[checIndex].validation[0].questionNo
                            &&
                            validateQuestion.answer.length > 0
                            &&
                            validateQuestion.answer[0].option == allQuestions[checIndex].validation[0].value) ||
                        (
                            allQuestions[checIndex] && allQuestions[checIndex].validation && allQuestions[checIndex].validation.length > 0
                            &&
                            validateQuestion.parentQuestionNo == allQuestions[checIndex].validation[1].parentQuestionNo
                            &&
                            validateQuestion.questionNo == allQuestions[checIndex].validation[1].questionNo
                            &&
                            validateQuestion.answer.length > 0
                            &&
                            validateQuestion.answer[0].option == allQuestions[checIndex].validation[1].value)
                    ) {
                        // console.log(data)
                        if (data.isValidateQuestion) {
                            dispatch({ type: ActionTypes.SELECTED_VALIDATION_QUESTION, payload: data })
                        }
                        changeIndex(checIndex)
                        break
                    } else {
                    }
                }
            } else {
                console.log("length is == 1")

                var screenNavigated = false
                for (let ind = 0; ind < allQuestions.length; ind++) {

                    console.log("for length is validateQuestion " + JSON.stringify(validateQuestion))
                    var checIndex = ind + 1
                    if (
                        allQuestions[checIndex] && allQuestions[checIndex].validation && allQuestions[checIndex].validation.length > 0
                        &&
                        allQuestions[index].parentQuestionNo == allQuestions[checIndex].validation[0].parentQuestionNo
                        &&
                        allQuestions[index].questionNo == allQuestions[checIndex].validation[0].questionNo
                        &&
                        allQuestions[index].answer.length > 0
                        &&
                        allQuestions[index].answer[0].option == allQuestions[checIndex].validation[0].value
                    ) {
                        if (data.isValidateQuestion) {
                            dispatch({ type: ActionTypes.SELECTED_VALIDATION_QUESTION, payload: data })
                        }
                        // changeIndex(index+1)
                        changeIndex(checIndex)
                        screenNavigated = true
                        break
                    } else {

                    }
                    if (!screenNavigated) {
                        doNavigationButtonValidation(index + 1)
                    } else {

                    }
                }
            }

        } else {
            // console.log(data)
            if (data.isValidateQuestion) {
                dispatch({ type: ActionTypes.SELECTED_VALIDATION_QUESTION, payload: data })
            }
            changeIndex(index + 1)
        }
    }


    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            console.log("validateQuestion  " + JSON.stringify(validateQuestion))
            doNavigationButtonValidation(index)
        }}>
            <Text style={styles.buttonTextStyle}>{data.buttonName ? data.buttonName : "ENTER"}</Text>
        </TouchableOpacity>
    );
};



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
        alignSelf: "flex-start",
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
