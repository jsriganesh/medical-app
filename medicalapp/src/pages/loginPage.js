//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Modal, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import colors from '../utils/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { changeSpinnerFlag } from "../components/commonFunctions"
import { ErrorAlert } from "../components/commonFunctions"
import { post } from "../services/apiService"
import { ApiUrl } from "../services/apiUrl"
import { connect } from 'react-redux';
import {storeData,storageKeys,getData} from '../components/asyncStorage'

function validateEmailAddress() {
    var showWrongEmailIdStyle = false
    const emailRegex =
        /^(?!.{191})(?:[a-zA-Z0-9_’^&/+-])+(?:\.(?:[a-zA-Z0-9_’^&/+-])+)*@(?:(?:\[?\.){3}(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]?)|(?:[a-zA-Z0-9-]+\.)+(?:[a-zA-Z]){2,}\.?)$/;

    if (emailId != "") {
        if (emailRegex.test(emailId)) {
            showWrongEmailIdStyle = false;
            console.log("email is correct ")
        } else {
            showWrongEmailIdStyle = true;
            console.log("in valid email ")
        }
    } else {
        showWrongEmailIdStyle = true;
        console.log("Email Id blank")
    }

    return showWrongEmailIdStyle

}

class LoginPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showDatePicker: false,

            email: "sri@gmail.com",
            password: "12345",
        }
    }


    doLogin() {
        var { email, password } = this.state
        if (email) {
            if (password) {
                changeSpinnerFlag(this.props, true)
                var data = {
                    emailId: email,
                    password: password,
                }
                post(
                    ApiUrl.doLogin,
                    data,
                    this.loginSuccess,
                    this.loginError
                )

            } else {
                ErrorAlert("Please enter the password")
            }
        } else {
            ErrorAlert("Please enter the Email")
        }
    }


     loginSuccess  = async(success) => {
        changeSpinnerFlag(this.props, false)
        // console.log("success")
        // console.log(success)
        if (success.success) {
            // var accessToken = success.accessToken
            await storeData(storageKeys.loginDetails, success).then((val)=>{
                // getData(storageKeys.loginDetails)
            })
           

            this.props.navigation.navigate("Home")
            this.setState({
                email: "",
                password: "",
            })
        } else {
            ErrorAlert(success.message)
        }
    }

    loginError = err => {
        changeSpinnerFlag(this.props, false)
        console.log("err")
        console.log(err)
        ErrorAlert(err.message)
    }

    updateText(key, value) {
        var states = this.state;
        states[key] = value;
        this.setState({
            states
        })
    }

    renderTextBoxWithIcon(image, placeholder, stateKey, value) {
        return (
            <View style={styles.componentContainer}>
                <View style={styles.imageBackground}>
                    <Image source={image} style={styles.image} />
                </View>
                <TextInput
                    value={value}
                    onChangeText={(text) => {
                        this.updateText(stateKey, text)
                    }} placeholderTextColor={colors.themeColor} style={styles.newTextBoxStyle} placeholder={placeholder} />
            </View>
        )
    }

    renderButtonBoxWithIcon(image, placeholder, stateKey, value) {
        return (
            <TouchableOpacity onPress={() => {
                this.setState({
                    showDatePicker: true
                })
            }} style={styles.componentContainer}>
                <View style={styles.imageBackground}>
                    <Image source={image} style={styles.image} />
                </View>

                <Text style={[styles.newTextBoxStyle]}>{value ? value : placeholder}</Text>
            </TouchableOpacity>
        )
    }


    button = (labels, pageName, type) => {
        return (
            <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                if (type == "SI") {
                    this.doLogin()
                } else {
                    this.props.navigation.navigate(pageName)
                }
                // this.props.navigation.navigate(pageName)
                // this.doLogin()
            }}>
                <Text style={styles.buttonTextStyle}>{labels}</Text>
            </TouchableOpacity>
        );
    }


    render() {
        var { showDatePicker, email, password } = this.state
        return (
            <View style={styles.container}>
                <View style={{ marginVertical: 50, alignItems: "center", }}>
                    <Image source={require("../../assets/images/backgroundImage.png")} style={{ height: 160, width: 180, tintColor: colors.themeColor }} />
                </View>
                <View>
                    <KeyboardAwareScrollView>
                        {this.renderTextBoxWithIcon(
                            require("../../assets/images/email.png"),
                            "Registered Email id",
                            "email",
                            email
                        )}
                        {this.renderTextBoxWithIcon(
                            require("../../assets/images/password.png"),
                            "Password",
                            "password",
                            password
                        )}

                    </KeyboardAwareScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 14, color: colors.themeColor }}>{"Forgot Password?"}</Text>
                        </TouchableOpacity>

                    </View>
                    {this.button("Sign In", "Home", "SI")}
                    {this.button("Sign Up", "RegistrationPage", "SU")}
                </View>
                <View></View>
            </View>
        );
    }
}




// define your styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        flex: 1,
        // justifyContent: "space-between",
        backgroundColor: colors.white,
    },
    componentContainer: {
        borderWidth: 2, height: 55, width: "100%", borderColor: colors.themeColor, borderRadius: 6, flexDirection: "row", alignItems: "center", marginVertical: 8
    },
    imageBackground: {
        backgroundColor: colors.themeColor, marginHorizontal: 10, borderRadius: 50, marginVertical: 5
    },
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
    image: { height: 45, width: 45, tintColor: colors.white },
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


const mapStateToProps = (state) => ({
});

//make this component available to the app
export default connect(mapStateToProps)(LoginPage);
