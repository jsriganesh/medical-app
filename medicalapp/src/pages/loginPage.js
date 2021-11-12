// //import liraries
// import React, { Component, useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TextInput, Modal, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
// import colors from '../utils/colors';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { changeSpinnerFlag } from "../components/commonFunctions"
// import { ErrorAlert } from "../components/commonFunctions"
// import { post } from "../services/apiService"
// import { ApiUrl } from "../services/apiUrl"
// import { connect } from 'react-redux';
// import { storeData, storageKeys, getData } from '../components/asyncStorage'
// import { useNavigation } from '@react-navigation/native';

// function validateEmailAddress() {
//     var showWrongEmailIdStyle = false
//     const emailRegex =
//         /^(?!.{191})(?:[a-zA-Z0-9_’^&/+-])+(?:\.(?:[a-zA-Z0-9_’^&/+-])+)*@(?:(?:\[?\.){3}(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\]?)|(?:[a-zA-Z0-9-]+\.)+(?:[a-zA-Z]){2,}\.?)$/;

//     if (emailId != "") {
//         if (emailRegex.test(emailId)) {
//             showWrongEmailIdStyle = false;
//             console.log("email is correct ")
//         } else {
//             showWrongEmailIdStyle = true;
//             console.log("in valid email ")
//         }
//     } else {
//         showWrongEmailIdStyle = true;
//         console.log("Email Id blank")
//     }

//     return showWrongEmailIdStyle

// }


// // define your stylesa
// const styles = StyleSheet.create({
//     container: {
//         paddingHorizontal: 30,
//         flex: 1,
//         // justifyContent: "space-between",
//         backgroundColor: colors.white,
//     },
//     componentContainer: {
//         borderWidth: 2, height: 55, width: "100%", borderColor: colors.themeColor, borderRadius: 6, flexDirection: "row", alignItems: "center", marginVertical: 8
//     },
//     imageBackground: {
//         backgroundColor: colors.themeColor, marginHorizontal: 10, borderRadius: 50, marginVertical: 5
//     },
//     newTextBoxStyle: {
//         width: "100%",
//         // height: 45,
//         fontSize: 16,
//         color: colors.themeColor,
//         // borderBottomWidth: 2,
//         // borderBottomColor: colors.textBoXFontColor,
//         // color: colors.textBoXFontColor,
//         paddingHorizontal: 10,
//     },
//     image: { height: 45, width: 45, tintColor: colors.white },
//     buttonStyle: {
//         backgroundColor: colors.themeColor,
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         borderRadius: 5,
//         // alignSelf: "center",
//         alignItems: "center",
//         marginTop: 20,
//         width: "100%"
//         // aliginContent:"flex-start",
//         // alignSelf:"flex-start"
//     },
//     buttonTextStyle: {
//         color: colors.white,
//         fontSize: 16,
//         fontWeight: "bold",
//     }

// });


// // const mapStateToProps = (state) => ({
// // });

// // //make this component available to the app
// // export default connect(mapStateToProps)(LoginPage);

// // export const CommonButton = ({ label, callBack }) => {
// //     return (
// //         <TouchableOpacity style={styles.buttonStyle} onPress={() => {
// //             callBack()
// //         }}>
// //             <Text style={styles.buttonTextStyle}>{label}</Text>
// //         </TouchableOpacity>
// //     );
// // }


// // export const RenderTextBoxWithIcon = ({ image, placeholder, value, callBack }) => {
// //     return (
// //         <View style={styles.componentContainer}>
// //             <View style={styles.imageBackground}>
// //                 <Image source={image} style={styles.image} />
// //             </View>
// //             <TextInput
// //                 value={value}
// //                 onChangeText={(text) => {
// //                     callBack(text)
// //                     // this.updateText(stateKey, text)
// //                 }} placeholderTextColor={colors.themeColor} style={styles.newTextBoxStyle} placeholder={placeholder} />
// //         </View>
// //     )
// // }

// export const EmailIdScreen = (props) => {
//     const navigation = useNavigation();

//     const [email, setEmail] = useState("");

//     function checkEmail() {

//         if (email) {
//             changeSpinnerFlag(props, true)
//             var data = {
//                 emailId: email,
//             }
//             post(
//                 ApiUrl.checkUserExist,
//                 data,
//                 (success) => {
//                     changeSpinnerFlag(props, false)
//                     if (success.userExist) {
//                         navigation.navigate("PasswordScreen", { email: email, userDetails: success })
//                     } else {
//                         ErrorAlert("Email Id is not register")
//                     }
//                 },
//                 (error) => {
//                     changeSpinnerFlag(props, false)
//                     ErrorAlert("Something went worng")
//                 }
//             )

//         } else {
//             ErrorAlert("Please enter the Email")
//         }
//     }

//     return (
//         <View style={styles.container}>
//             <View style={{ marginVertical: 50, alignItems: "center", }}>
//                 <Image source={require("../../assets/images/backgroundImage.png")} style={{ height: 160, width: 180, tintColor: colors.themeColor }} />
//             </View>
//             <View style={{ justifyContent: "center", flex: 1 }}>
//                 <RenderTextBoxWithIcon
//                     image={require("../../assets/images/email.png")}
//                     placeholder="Registered Email id"
//                     value={email}
//                     callBack={(text) => {
//                         setEmail(text)
//                     }}
//                 />
//                 <CommonButton label={"Next.."} callBack={() => {
//                     checkEmail()
//                     // /    navigation.navigate("PasswordScreen",{email:email})
//                 }} />
//             </View>
//         </View>
//     )

// }



// export const PasswordScreen = (props) => {
//     const navigation = useNavigation();
//     const [password, setPassword] = useState("");
//     console.log(JSON.stringify(props.route.params.email))



//     function doLogin() {

//         if (email) {
//             changeSpinnerFlag(props, true)
//             var data = {
//                 emailId: props.route.params.email,
//                 password: password,
//             }
//             post(
//                 ApiUrl.doLogin,
//                 data,
//                 async (success) => {
//                     if (success.success) {
//                         await storeData(storageKeys.loginDetails, success).then((val) => {
//                         })
//                         navigation.navigate("Home")
//                     } else {
//                         ErrorAlert(success.message)
//                     }
//                 },
//                 (error) => {
//                     changeSpinnerFlag(props, false)
//                     ErrorAlert("Something went worng")
//                 }
//             )
//             // changeSpinnerFlag(props, true)
//             // var data = {
//             //     emailId: email,
//             // }
//             // post(
//             //     ApiUrl.checkUserExist,
//             //     data,
//             // (success)=>{
//             //     changeSpinnerFlag(props, false)
//             //     if (success.userExist) {
//             //         navigation.navigate("PasswordScreen",{email:email,userDetails:success})
//             //     } else {
//             //         ErrorAlert("Email Id is not register")
//             //     }
//             // },
//             // (error)=>{
//             //     ErrorAlert("Something went worng")
//             // }
//             // )

//         } else {
//             ErrorAlert("Please enter the Email")
//         }
//     }


//     return (
//         <View style={styles.container}>
//             <View style={{ marginVertical: 50, alignItems: "center", }}>
//                 <Image source={require("../../assets/images/backgroundImage.png")} style={{ height: 160, width: 180, tintColor: colors.themeColor }} />
//             </View>
//             <View style={{ justifyContent: "center", flex: 1 }}>
//                 <RenderTextBoxWithIcon
//                     image={require("../../assets/images/email.png")}
//                     placeholder="Enter Your password"
//                     value={password}
//                     callBack={(text) => {
//                         setPassword(text)
//                     }}
//                 />
//                 <CommonButton label={"Submit"} callBack={() => {
//                     doLogin()
//                     // navigation.navigate("Home")
//                 }} />
//             </View>
//         </View>
//     )

// }