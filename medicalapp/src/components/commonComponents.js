//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import colors from '../utils/colors';
import FontFamily from '../utils/fontFamily';
import theme from '../utils/theme';

// create a component


export const Question = ({ question, manditaory, questionNo }) => {
    return (
        <View>
            <Text style={styles.questionFontStyle}>

                {questionNo ? questionNo + ". " : null}
                {question}
                {manditaory ?
                        <Text style={[styles.questionFontStyle, { color: colors.red }]}>{" *"}</Text>
                        : null
                }</Text>
        </View>
    );
};



export const QuestionMessage = () => {
    return (
        <View>
            <Text style={styles.questionMessageFontStyle}>Question</Text>
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

export const CommonButton = ({btnText,changeIndex,index}) => {
    return (
            <TouchableOpacity style={styles.buttonStyle} onPress={()=>{
                changeIndex(index+1)
            }}>
                <Text style={styles.buttonTextStyle}>{btnText ? btnText : "ENTER"}</Text>
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
    buttonStyle:{
        backgroundColor:colors.themeColor,
        paddingHorizontal:20,
        paddingVertical:6,
        borderRadius:5,
        alignSelf: "flex-start",
        marginVertical:20
        // aliginContent:"flex-start",
        // alignSelf:"flex-start"
    },
    buttonTextStyle:{
        color:colors.white,
        fontSize:22,
        fontWeight:"bold",
       
        
    }
});
