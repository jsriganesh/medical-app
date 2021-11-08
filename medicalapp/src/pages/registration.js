//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Modal, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
// import { Question, QuestionMessage, c } from "../components/commonComponents"
import colors from '../utils/colors';
import FloationTextBox from "../components/floatingTextBox"
// create a component
import { DatePicker, TimePicker } from "../components/dateAndTimePicker"
import { ModalComponent } from "../components/modalComponent"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


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

// const Question = (props) => {

//     function onChangeValue(rr) {
//         console.log("test" + rr)
//     }
//     return (
//         <View style={{ marginBottom: 20 }}>
//             <Text style={styles.questionFontStyle}>{props.question}</Text>
//             <TextInput style={styles.textBoxStyle} />
//             {/* <FloationTextBox labels={"labels.legalFirstName"} componentKey={"firstName"} showMandatory={true} value={""} onChangeValue={onChangeValue} /> */}

//         </View>
//     )
// }

// const Button = ({ btnName, callBack }) => {
//     return (
//         <TouchableOpacity style={styles.buttonStyle} onPress={() => {
//             callBack()
//         }}>
//             <Text style={styles.buttonTextStyle}>{btnName}</Text>
//         </TouchableOpacity>
//     );
// }


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

    // _doLogin() {
    //     this.setState({
    //         showPopup: false,
    //         showPasswordPopup: false
    //     })
    //     this.props.navigation.navigate("Home")
    // }

    // showLoginPopup() {
    //     this.setState({
    //         showPopup: true
    //     })
    // }

    // _doRegister() {
    //     this.setState({
    //         showPasswordPopup: true
    //     })
    // }




    // createOrEnterPassword = () => {
    //     var { email, password } = this.state
    //     return (
    //         <View>
    //             <Question value={password} password={true} question={"Pleace Enter your password"} key={"passowrd"} updateText={this.updateText.bind(this)} />
    //             <Button btnName="Login" callBack={this._doLogin.bind(this)} />
    //         </View>
    //     )
    // }

    // loginModel = () => {
    //     var { email, password } = this.state
    //     return (
    //         <View>
    //             <Question value={email} question={"Registered  email "} key={"email"} updateText={this.updateText.bind(this)} />
    //             <Question value={password} password={true} question={"Password:"} key={"passowrd"} updateText={this.updateText.bind(this)} />
    //             <Button btnName="Login" callBack={this._doLogin.bind(this)} />
    //         </View>
    //     )
    // }

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

    button = (labels, pageName) => {
        return (
            <TouchableOpacity style={styles.buttonStyle} onPress={() => { this.props.navigation.navigate(pageName) }}>
                <Text style={styles.buttonTextStyle}>{labels}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        var { showPopup, showDatePicker, dateOfBirth, fName, lName, email, showPasswordPopup } = this.state
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
                    {/* {this.renderTextBoxWithIcon(
                        require("../../assets/images/password.png"),
                        "Password"
                    )}
                    {this.renderTextBoxWithIcon(
                        require("../../assets/images/password.png"),
                        "Confirm Password"
                    )} */}
                    {/* <Question value={fName} question={"Enter your first name:"} key={"fName"} updateText={this.updateText.bind(this)} />
                    <Question value={lName} question={"Enter your last name:"} key={"lName"} updateText={this.updateText.bind(this)} />
                    <Question value={email} question={"Enter your Email Id:"} key={"email"} updateText={this.updateText.bind(this)} />
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.questionFontStyle}>{"Enter your Date of Birth:"}</Text>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                showDatePicker: true
                            })
                        }} style={styles.dobButtonStyle}>
                            <Text style={{ fontSize: 20, color: colors.textBoXFontColor, }}>{dateOfBirth}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Button btnName="Login" callBack={this.showLoginPopup.bind(this)} />
                        <Button btnName="Register" callBack={this._doRegister.bind(this)} />
                    </View> */}

                    {
                        showDatePicker ?
                            <DatePicker date={dateOfBirth} selectedDate={this.selectedDate.bind(this)} />
                            : null
                    }

                    {this.button("Register", "Home")}
                </KeyboardAwareScrollView>


                {/* <Modal
                    animationType="slide"
                    swipeToDismiss
                    transparent={true}
                    visible={showPopup}
                    onRequestClose={() => {
                        this.setState({
                            showPopup: !showPopup
                        })
                        // setShowPopupFlag(!showPopup)
                    }}
                >
                    <ModalComponent modalHeight="70%" canClose={true} onClose={() => {
                        this.setState({
                            showPopup: !showPopup
                        })
                    }} innerElement={this.loginModel()} />
                </Modal>


                <Modal
                    animationType="slide"
                    swipeToDismiss
                    transparent={true}
                    visible={showPasswordPopup}
                    onRequestClose={() => {
                        this.setState({
                            showPasswordPopup: !showPasswordPopup
                        })
                    }}
                >
                    <ModalComponent modalHeight="70%" canClose={true} onClose={() => {
                        this.setState({
                            showPasswordPopup: !showPasswordPopup
                        })
                    }} innerElement={this.createOrEnterPassword()} />
                </Modal> */}

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

//make this component available to the app
export default RegistrationPage;
