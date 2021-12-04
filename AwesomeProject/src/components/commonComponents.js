//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { isDeviceWidth360_374 } from '../services/config';
import { FontFamily } from '../utils/fontFamily';
import "@expo/match-media";
import { useMediaQuery } from "react-responsive";
import responsiveStyle from "../utils/responsiveStyle"
// create a component

var colors = {
    themeColor: "#224B3B",
    appBackgroundColor: "#2c3e50",
    questionFontColor: "#224B3B",
    textBoXFontColor: "#2A6A53",
    red: "red",
    messageColor: "#648175",
    white: "#FFFFFF",

    buttonBackgroundColor: "#E9F0ED",
    borderColor: "#A2BEB4"
}

export const Question = ({ data }) => {
    let { ids } = responsiveStyle.getSheet();
    return (
        <View>
            <Text dataSet={{ media: ids.homeQuestionText }} style={styles.questionFontStyle}>

                {data && data.questionNo ? data.questionNo + ". " : null}
                {data && data.question ? data.question : null}
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

export const TextBox = ({ changeText, index, data }) => {
    return (
        <View>
            <TextInput value={data.answer}
                maxLength={data.maxLength}
                keyboardType={data.dataType == "Number" ? "number-pad" : "default"}
                onChangeText={(text) => {
                    var pattern = /^\d+$/;
                    if (data.dataType == "Number" && text) {
                        if (pattern.test(text)) {
                            changeText(text, index)
                        }
                    } else {
                        changeText(text, index)
                    }
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
        fontFamily: FontFamily.fontBold,

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
        borderWidth: 2, height: 55,
        width: "100%",
        borderColor: colors.themeColor, borderRadius: 6, flexDirection: "row", alignItems: "center", marginVertical: 8
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
    },
    buttonWithIconStyle: {
        borderWidth: 2, height: 55, width: "100%", borderColor: colors.themeColor, borderRadius: 6, flexDirection: "row", alignItems: "center", marginVertical: 8
    }
});


export const CommonButton = ({ label, callBack }) => {

    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });
    const isDeviceWidth295_359 = useMediaQuery({
        query: "(min-device-width:295) and (max-device-width:359)",
    });
    const isDeviceWidth375_811 = useMediaQuery({
        query: "(min-device-width:375) and (max-device-height:811)",
    });
    const isDeviceWidth360_374 = useMediaQuery({
        query: "(min-device-width:360) and (max-device-width:374)",
    });

    let { ids } = responsiveStyle.getSheet();
    return (
        <View dataSet={{ media: ids.emailButtonView }}>
        <TouchableOpacity  style={[styles.buttonStyle, {  }]} onPress={() => {
            callBack()
        }}>
            <Text style={styles.buttonTextStyle}>{label}</Text>
        </TouchableOpacity>
        </View>
    );
}


export const RenderTextBoxWithIcon = ({ image, placeholder, value, callBack, type }) => {



    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });
    const isDeviceWidth295_359 = useMediaQuery({
        query: "(min-device-width:295) and (max-device-width:359)",
    });
    const isDeviceWidth375_811 = useMediaQuery({
        query: "(min-device-width:375) and (max-device-height:811)",
    });
    const isDeviceWidth360_374 = useMediaQuery({
        query: "(min-device-width:360) and (max-device-width:374)",
    });

    let { ids } = responsiveStyle.getSheet();

    return (
        <View dataSet={{ media: ids.emailButtonView }} style={[styles.componentContainer]}>
            <View style={styles.imageBackground}>
                <Image source={image} style={styles.image} />
            </View>
            <TextInput
                secureTextEntry={type == "password" ? true : false}
                value={value}
                onChangeText={(text) => {
                    callBack(text)
                    // this.updateText(stateKey, text)
                }} placeholderTextColor={colors.themeColor} style={styles.newTextBoxStyle} placeholder={placeholder} />
        </View>
    )
}


export const RenderButtonWithIcon = ({ image, placeholder, value, callBack }) => {



    const isTabletOrMobileDevice = useMediaQuery({
        query: "(max-device-width: 1224px)",
    });
    const isDeviceWidth295_359 = useMediaQuery({
        query: "(min-device-width:295) and (max-device-width:359)",
    });
    const isDeviceWidth375_811 = useMediaQuery({
        query: "(min-device-width:375) and (max-device-height:811)",
    });
    const isDeviceWidth360_374 = useMediaQuery({
        query: "(min-device-width:360) and (max-device-width:374)",
    });

    return (
        <TouchableOpacity onPress={() => {
            // this.setState({
            //     showDatePicker: true
            // })
            callBack()
        }} style={[styles.buttonWithIconStyle, { width: isDeviceWidth360_374 ? "100%" : isDeviceWidth375_811 ? 300 : 300, }]}>
            <View style={{ backgroundColor: colors.themeColor, marginHorizontal: 10, borderRadius: 50, marginVertical: 5 }}>
                <Image source={image} style={{ height: 45, width: 45, tintColor: colors.white }} />
            </View>

            <Text style={[styles.newTextBoxStyle]}>{value ? value : placeholder}</Text>
        </TouchableOpacity>
    )
}