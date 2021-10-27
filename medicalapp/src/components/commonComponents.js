//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import FontFamily from '../utils/fontFamily';
import theme from '../utils/theme';

// create a component


export const Question = ({ data }) => {
    return (
        <View>
            <Text style={styles.questionFontStyle}>

                {data.questionNo ? data.questionNo + ". " : null}
                {data.question}
                {data.manditaory ?
                    <Text style={[styles.questionFontStyle, { color: colors.red }]}>{" *"}</Text>
                    : null
                }</Text>
        </View>
    );
};



export const QuestionMessage = ({ msg }) => {
    return (
        <View>
            <Text style={styles.questionMessageFontStyle}>{msg}</Text>
        </View>
    );
};

export const TextBox = () => {
    return (
        <View>
            <TextInput style={styles.textBoxStyle} />
        </View>
    );
};

export const CommonButton = ({ data, changeIndex, index, allQuestions }) => {

    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {

            if (allQuestions[index + 1].validation && allQuestions[index + 1].validation.length > 0) {


                // if (allQuestions[index + 1].validation.length > 1) {
                //     for (let ind = 0; ind < allQuestions.length; ind++) {

                //         let checIndex = ind + 1
                //         if (
                //             (allQuestions[checIndex] && allQuestions[checIndex].validation && allQuestions[checIndex].validation.length > 0
                //                 &&
                //                 allQuestions[index].parentQuestionNo == allQuestions[checIndex].validation[0].parentQuestionNo
                //                 &&
                //                 allQuestions[index].questionNo == allQuestions[checIndex].validation[0].questionNo
                //                 &&
                //                 allQuestions[index].answer.length > 0
                //                 &&
                //                 allQuestions[index].answer[0].option == allQuestions[checIndex].validation[0].value) ||
                //             (allQuestions[checIndex] && allQuestions[checIndex].validation && allQuestions[checIndex].validation.length > 0
                //                 &&
                //                 allQuestions[index].parentQuestionNo == allQuestions[checIndex].validation[1].parentQuestionNo
                //                 &&
                //                 allQuestions[index].questionNo == allQuestions[checIndex].validation[1].questionNo
                //                 &&
                //                 allQuestions[index].answer.length > 0
                //                 &&
                //                 allQuestions[index].answer[0].option == allQuestions[checIndex].validation[1].value)
                //         ) {
                //             console.log("is ok" + JSON.stringify(allQuestions[checIndex]))
                //             // ind++;
                //             changeIndex(checIndex)
                //         } else {
                //             console.log("tt",allQuestions[ind])

                //         }


                //     }
                // } else {
                for (let ind = 0; ind < allQuestions.length; ind++) {

                    var checIndex = ind + 1
                    if (
                        //  ind  > index&&
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
                        // if (
                        //     (
                        //         allQuestions[checIndex].validation[0].type == "equal" &&
                        //         allQuestions[index].answer[0].option == allQuestions[checIndex].validation[0].value
                        //     )
                        //     ||
                        //     (
                        //         allQuestions[checIndex].validation[0].type == "notEqual" &&
                        //         allQuestions[index].answer[0].option !== allQuestions[checIndex].validation[0].value
                        //     )

                        // ) {
                            console.log("is ok" + JSON.stringify(allQuestions[checIndex]))
                            changeIndex(checIndex)

                            break
                        // }

                    } else {
                        console.log(allQuestions[ind])

                    }


                    // }
                }
                //     while (
                //     // allQuestions[index+1].validation && allQuestions[index+1].validation.length> 0
                //     // &&
                //     allQuestions[index].parentQuestionNo == allQuestions[index+1].validation[0].parentQuestionNo
                //     &&
                //     allQuestions[index].questionNo == allQuestions[index+1].validation[0].questionNo
                //     &&
                //     allQuestions[index].answer.length > 0
                //     // &&
                //     // allQuestions[index].answer[0].option == allQuestions[index+1].validation[0].value
                // ) {
                //     console.log("is ok"+JSON.stringify(allQuestions[index]))
                //     index++;
                // }
            } else {
                changeIndex(index + 1)
            }




            // for (let a = 0; a < allQuestions.length; a++) {
            //     if(a >= index){
            //         var checkValidation = allQuestions[a + 1].validation
            //         console.log(allQuestions[a+1])

            //         if(checkValidation !== undefined && checkValidation.length > 0){
            //             if (
            // allQuestions[a].parentQuestionNo == checkValidation[0].parentQuestionNo
            //             &&
            //             allQuestions[a].questionNo == checkValidation[0].questionNo
            //             &&
            //             allQuestions[a].answer.length > 0
            //             &&
            //             allQuestions[a].answer[0].option == checkValidation[0].value
            //             ) {
            //                 changeIndex(a + 1)
            //                 break
            //             }else{

            //             }
            //         }else{
            //             changeIndex(index + 1)
            //             break
            //         }
            //     }
            // }

            // var checkValidation = allQuestions[index + 1].validation
            // console.log(checkValidation)
            // if (checkValidation !== undefined && checkValidation.length > 0) {

            //     for (let i = 0; i < allQuestions.length; i++) {

            // if (allQuestions[i].parentQuestionNo == checkValidation[0].parentQuestionNo
            //     &&
            //     allQuestions[i].questionNo == checkValidation[0].questionNo
            //     &&
            //     allQuestions[i].answer[0].option == checkValidation[0].value
            // ) {
            //             // var ans = allQuestions[i].answer
            //             // for (let a = 0; a < ans.length; a++) {
            //             //     if(ans[a].option == checkValidation[0].value){
            //             changeIndex(i + 1)
            //             // }
            //             // }
            //         }

            //     }
            // } else {
            //     // if(allQuestions)
            //     changeIndex(index + 1)
            // }
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
