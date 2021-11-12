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
import { storeData, storageKeys, getData } from '../components/asyncStorage'
import { useNavigation } from '@react-navigation/native';
import { RenderTextBoxWithIcon, CommonButton } from "../components/commonComponents"
import ModalPoup from "../components/toast"

export const EmailIdScreen = (props) => {
    const navigation = useNavigation();

    const [email, setEmail] = useState("sri@gmail.com");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageFlag, setErrorMessageFlag] = useState(false);

    function checkEmail() {

        if (email) {
            changeSpinnerFlag(props, true)
            var data = {
                emailId: email,
            }
            post(
                ApiUrl.checkUserExist,
                data,
                (success) => {
                    changeSpinnerFlag(props, false)
                    if (success.userExist) {
                        navigation.navigate("PasswordScreen", { email: email, userDetails: success })
                    } else {
                        navigation.navigate("PasswordScreen", { email: "" })
                        // ErrorAlert("Email Id is not register")
                        setEmail("")
                    }
                },
                (error) => {
                    changeSpinnerFlag(props, false)
                    // ErrorAlert("Something went worng")
                    setErrorMessage("Something went worng")
                    setErrorMessageFlag(true)
                }
            )

        } else {
            // ErrorAlert("Please enter the Email")
            setErrorMessage("Please enter the Email")
            setErrorMessageFlag(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 50, alignItems: "center", flex: 0.4, justifyContent: "center" }}>
                <Image source={require("../../assets/images/backgroundImage.png")} style={{ height: 160, width: 180, tintColor: colors.themeColor }} />
            </View>
            <View style={{ justifyContent: "center", flex: 0.6 }}>
                <RenderTextBoxWithIcon
                    image={require("../../assets/images/email.png")}
                    placeholder="Registered Email id"
                    value={email}
                    callBack={(text) => {
                        setEmail(text)
                    }}
                />
                <CommonButton label={"Next.."} callBack={() => {
                    checkEmail()
                }} />
                <ModalPoup visible={errorMessageFlag} children={errorMessage} callBack={() => {
                    setErrorMessage("")
                    setErrorMessageFlag(false)
                }} />
            </View>
        </View>
    )

}

const mapStateToProps = (state) => ({
});
//make this component available to the app
export default connect(mapStateToProps)(EmailIdScreen);




const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        flex: 1,
        // justifyContent: "space-between",
        backgroundColor: colors.white,
    },

});
