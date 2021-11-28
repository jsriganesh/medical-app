//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native';
import colors from '../utils/colors';
import FontFamily from '../utils/fontFamily';
import theme from '../utils/theme';

// create a component


export const Question = ({ data }) => {
    return (
        <View>
            <Text style={styles.questionFontStyle}>

                {data && data.questionNo ? data.questionNo + ". " : null}
                {data && data.question ?  data.question : null}
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
            maxLength={data.maxLength}
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
    componentContainer: {
        borderWidth: 2, height: 55, width: "100%", borderColor: colors.themeColor, borderRadius: 6, flexDirection: "row", alignItems: "center", marginVertical: 8
    },
    imageBackground: {
        backgroundColor: colors.themeColor, marginHorizontal: 10, borderRadius: 50, marginVertical: 5
    },
    image: { height: 45, width: 45, tintColor: colors.white },
    newTextBoxStyle: {
        width: "100%",
        // height: 45,
        fontSize: 16,
        color: colors.themeColor,
        // borderBottomWidth: 2,
        // borderBottomColor: colors.textBoXFontColor,
        // color: colors.textBoXFontColor,
        paddingHorizontal: 10,
    },
    buttonStyle: {
        backgroundColor: colors.themeColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        // alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
        width: "100%"
        // aliginContent:"flex-start",
        // alignSelf:"flex-start"
    },
    buttonTextStyle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    }
});


export const CommonButton = ({ label, callBack }) => {
    return (
        <TouchableOpacity style={styles.buttonStyle} onPress={() => {
            callBack()
        }}>
            <Text style={styles.buttonTextStyle}>{label}</Text>
        </TouchableOpacity>
    );
}


export const RenderTextBoxWithIcon = ({ image, placeholder, value, callBack }) => {
    return (
        <View style={styles.componentContainer}>
            <View style={styles.imageBackground}>
                <Image source={image} style={styles.image} />
            </View>
            <TextInput
                value={value}
                onChangeText={(text) => {
                    callBack(text)
                    // this.updateText(stateKey, text)
                }} placeholderTextColor={colors.themeColor} style={styles.newTextBoxStyle} placeholder={placeholder} />
        </View>
    )
}