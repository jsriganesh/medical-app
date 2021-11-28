//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import { FontFamily } from '../utils/fontFamily';
import { useNavigation } from '@react-navigation/native';

// create a component
const FinalPage = (props) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Image source={require("../../assets/images/success.png")} style={{ height: 150, width: 150, tintColor: colors.themeColor }} />
            <Text style={styles.thankYouFontStyle}>Thank You!</Text>
            <Text style={styles.questionFontStyle}>Thanks for your time and your answers have been saved successfully.</Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => {navigation.navigate("Home")}}>
                <Text style={styles.buttonTextStyle}>{"Go To Home "}</Text>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    questionFontStyle: {
        color: colors.questionFontColor,
        fontSize: 24,
        fontFamily: FontFamily.fontBold
    },
    thankYouFontStyle: {
        color: colors.questionFontColor,
        fontSize: 30,
        fontFamily: FontFamily.fontBold,
        marginVertical: 30
    },
    buttonStyle: {
        backgroundColor: colors.themeColor,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 5,
        // alignSelf: "flex-start",
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

//make this component available to the app
export default FinalPage;
