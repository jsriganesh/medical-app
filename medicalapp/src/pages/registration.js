//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Modal, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import colors from '../utils/colors';
import FloationTextBox from "../components/floatingTextBox"
import { connect } from 'react-redux';
import { DatePicker, TimePicker } from "../components/dateAndTimePicker"
import { ModalComponent } from "../components/modalComponent"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { changeSpinnerFlag, SuccessAlert } from "../components/commonFunctions"
import { ErrorAlert } from "../components/commonFunctions"
import {post} from "../services/apiService"
import {ApiUrl} from "../services/apiUrl"
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


class RegistrationPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            showPasswordPopup: false,
            showDatePicker: false,
            dateOfBirth: "",
            fName: "",
            lName: "",
            email: "",
            password: "",
            createPassword: "",
        }
    }

    selectedDate(date) {
        this.setState({
            dateOfBirth: date,
            showDatePicker: false
        })
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
            <View style={{ borderWidth: 2, height: 55, borderColor: colors.themeColor, borderRadius: 6, flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
                <View style={{ backgroundColor: colors.themeColor, marginHorizontal: 10, borderRadius: 50, marginVertical: 5 }}>
                    <Image source={image} style={{ height: 45, width: 45, tintColor: colors.white }} />
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
            }} style={{ borderWidth: 2, height: 55, width: "100%", borderColor: colors.themeColor, borderRadius: 6, flexDirection: "row", alignItems: "center", marginVertical: 8 }}>
                <View style={{ backgroundColor: colors.themeColor, marginHorizontal: 10, borderRadius: 50, marginVertical: 5 }}>
                    <Image source={image} style={{ height: 45, width: 45, tintColor: colors.white }} />
                </View>

                <Text style={[styles.newTextBoxStyle]}>{value ? value : placeholder}</Text>
            </TouchableOpacity>
        )
    }

    doRegistration() {
        var { dateOfBirth, fName, lName, email, password } = this.state

        if (fName) {
            if (lName) {
                if (email) {
                    if (dateOfBirth) {
                        if (password) {
                            changeSpinnerFlag(this.props,true)
                            var data ={
                                firstName:fName,
                                surName:lName,
                                dateOfBirth:dateOfBirth,
                                emailId:email,
                                password:password,
                            }
                            post(
                                ApiUrl.createUser,
                                data,
                                this.registrationnSuccess,
                                this.registrationnError
                            )

                        } else {
                            ErrorAlert("Please enter the password")
                        }
                    } else {
                        ErrorAlert("Please Select the Date of birth")
                    }
                } else {
                    ErrorAlert("Please enter the Email")
                }
            } else {
                ErrorAlert("Please enter the Last name")
            }
        } else {
            ErrorAlert("Please enter the First name")
        }
    }


    registrationnSuccess=success=>{
        changeSpinnerFlag(this.props,false)
        console.log("success")
        console.log(success)
        if(success.success){
            SuccessAlert(success.message)
            this.props.navigation.navigate("EmailIdScreen") 
            this.setState({
                dateOfBirth: "",
                fName: "",
                lName: "",
                email: "",
                password: "",
            })
        }else{
            ErrorAlert(success.message)
        }
    }

    registrationnError=err=>{
        changeSpinnerFlag(this.props,false)
        console.log("err")
        console.log(err)
        ErrorAlert(err.message)
    }

    button = (labels, pageName, callBack) => {
        return (
            <TouchableOpacity style={styles.buttonStyle} onPress={() => {
                // this.props.navigation.navigate(pageName) 
                this.doRegistration()
            }}>
                <Text style={styles.buttonTextStyle}>{labels}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        var { showPopup, showDatePicker, dateOfBirth, fName, lName, email, showPasswordPopup, password } = this.state
        return (
            // <ImageBackground resizeMode="center" source={require("../../assets/images/backgroundImage1.png")} style={styles.container}>
            <View style={styles.container}>
                <View style={{ marginVertical: 50, alignItems: "center", }}>
                    <Image source={require("../../assets/images/backgroundImage.png")} style={{ height: 160, width: 180, tintColor: colors.themeColor }} />
                </View>
                <KeyboardAwareScrollView>
                    {this.renderTextBoxWithIcon(
                        require("../../assets/images/user.png"),
                        "First Name",
                        "fName",
                        fName
                    )}
                    {this.renderTextBoxWithIcon(
                        require("../../assets/images/user.png"),
                        "Last Name",
                        "lName",
                        lName
                    )}
                    {this.renderTextBoxWithIcon(
                        require("../../assets/images/email.png"),
                        "Email id",
                        "email",
                        email
                    )}
                    {this.renderButtonBoxWithIcon(
                        require("../../assets/images/dob.png"),
                        "Date of Birth",
                        "dateOfBirth",
                        dateOfBirth
                    )}
                    {this.renderTextBoxWithIcon(
                        require("../../assets/images/password.png"),
                        "Password",
                        "password",
                        password
                    )}

                    {
                        showDatePicker ?
                            <DatePicker date={dateOfBirth} selectedDate={this.selectedDate.bind(this)} />
                            : null
                    }

                    {this.button("Register", "Home")}
                </KeyboardAwareScrollView>


            </View>
            // </ImageBackground>
        );
    }
}




// define your styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1,
        // justifyContent: "space-evenly",
        // paddingTop: 200,
        backgroundColor: colors.white,
    },
    questionFontStyle: {
        color: colors.questionFontColor,
        fontSize: 18,
        fontFamily: FontFamily.fontBold
    },
    textBoxStyle: {
        width: "100%",
        height: 45,
        borderBottomWidth: 2,
        borderBottomColor: colors.textBoXFontColor,
        color: colors.textBoXFontColor,
        fontSize: 20,
        padding: 0,
        paddingHorizontal: 10

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
    dobButtonStyle: {
        width: "100%",
        height: 45,
        borderBottomWidth: 2,
        borderBottomColor: colors.textBoXFontColor,
        // backgroundColor: "green"
        justifyContent: "flex-end"
    },

    buttonStyle: {
        // backgroundColor: colors.themeColor,
        // paddingHorizontal: 20,
        // paddingVertical: 6,
        // borderRadius: 5,
        // alignSelf: "center",
        // marginVsertical: 20
        // // aliginContent:"flex-start",
        // // alignSelf:"flex-start"
        backgroundColor: colors.themeColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        // alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
        width: "100%"
    },
    buttonTextStyle: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",


    }
});

const mapStateToProps = (state) => ({
});
export default connect(mapStateToProps)(RegistrationPage);
