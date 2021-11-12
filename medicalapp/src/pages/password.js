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

export const PasswordScreen = (props) => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    console.log(JSON.stringify(props.route.params.email))



    function doLogin() {

        if (password) {
            changeSpinnerFlag(props, true)
            var data = {
                emailId: props.route.params.email,
                password: password,
            }
            post(
                ApiUrl.doLogin,
                data,
                async (success) => {
                    changeSpinnerFlag(props, false)
                    if (success.success) {
                        await storeData(storageKeys.loginDetails, success).then((val) => {
                        })
                        navigation.navigate("Home")
                        setPassword("")
                    } else {
                        ErrorAlert(success.message)
                    }
                },
                (error) => {
                    changeSpinnerFlag(props, false)
                    ErrorAlert("Something went worng")
                }
            )

        } else {
            ErrorAlert("Please enter the password")
        }
    }


    return (
        <View style={styles.container}>
            <View style={{ marginVertical: 50, alignItems: "center", }}>
                <Image source={require("../../assets/images/backgroundImage.png")} style={{ height: 160, width: 180, tintColor: colors.themeColor }} />
            </View>
            {
                props.route.params.email ?

                    <View style={{ justifyContent: "center", flex: 1 }}>
                        <RenderTextBoxWithIcon
                            image={require("../../assets/images/email.png")}
                            placeholder="Enter Your password"
                            value={password}
                            callBack={(text) => {
                                setPassword(text)
                            }}
                        />
                        <CommonButton label={"Submit"} callBack={() => {
                            doLogin()
                            // navigation.navigate("Home")
                        }} />
                    </View>
                    : <View style={{ justifyContent: "center", flex: 1 }}>
                        <Text style={{ color: colors.themeColor ,textAlign:"center",marginHorizontal:20,fontSize:15}}>{"Your email id  is not register in this app. pls register and countinue.."}</Text>
                        <CommonButton label={"Register"} callBack={() => {

                            navigation.navigate("RegistrationPage")
                        }} />
                    </View>
            }
        </View>
    )

}

const mapStateToProps = (state) => ({
});
//make this component available to the app
export default connect(mapStateToProps)(PasswordScreen);




const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: colors.white,
    },

});
