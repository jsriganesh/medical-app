//import liraries
import React, { Component, useState } from 'react';
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
                {data.mandatory ?
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

export const TextBox = ({changeText,index,data}) => {
    return (
        <View>
            <TextInput value={data.answer} 
            maxLength={data.minLength}
             keyboardType={data.dataType == "Number"? "number-pad":"default"}
            onChangeText={(text) => {
                changeText(text,index)
            }}
            style={styles.textBoxStyle} />
        </View>
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
});
