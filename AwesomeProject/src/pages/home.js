//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Question, QuestionMessage, TextBox } from "../components/commonComponents"
import CommonButton from "../components/commonButton"
import MultiselectButton from "../components/multiSelectButton"
import { colors } from '../utils/colors';
import { Surface } from 'react-native-paper';
import { connect } from "react-redux";
import { ActionTypes } from '../redux/action/actionList';

import { post } from "../services/apiService"
import { ApiUrl } from "../services/apiUrl"
import { changeSpinnerFlag, ErrorAlert, flexValidation, SuccessAlert } from '../components/commonFunctions';
import { removeValue, storageKeys } from "../components/asyncStorage"
const { width, height } = Dimensions.get('window')
// var mockQuestions = require("../../CMD_new_questions.json")
import ModalPoup from "../components/toast"
import { Platform } from 'react-native';
import { base64Image } from '../services/config';
import responsiveStyle from "../utils/responsiveStyle"

const mapStateToProps = (state) => ({
    backNavigationList: state.backNavigationListReducer.backNavigationList,
});

const DeviceWidth = Dimensions.get("window").width

class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            // dummyQuestions: mockQuestions.data,
            // type : "next"

            dataBaseQuestions: [],

            listOfQuestions: [],
            totalQuetions: 10,
            errorMessage: "",
            errorMessageFlag: false,
            currentQuestionDetails: {}
        }
    }



    getQuestions() {

        // var len = this.statedataBaseQuestions

        var data = this.state.dataBaseQuestions
        // var q = []
        // for (let i = 0; i < this.state.totalQuetions; i++) {
        //     q.push(data[i])
        // }
        this.setState({
            // listOfQuestions: q
            listOfQuestions: data

        })
    }

    componentDidMount() {
        this.getAllQuestions()
        // this.changeIndex(0)
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getAllQuestions()
        });
    }


    componentWillUnmount() {
        this._unsubscribe();
    }

    getAllQuestions() {
        changeSpinnerFlag(this.props, true)
        post(
            ApiUrl.getQuestion,
            {},
            this.getAllQuestionsSuccess,
            this.getAllQuestionsError
        )
    }

    getAllQuestionsSuccess = (data) => {
        changeSpinnerFlag(this.props, false)
        if (data.success) {
            console.log(JSON.stringify(data))
            this.setState({
                dataBaseQuestions: data.data
                // dataBaseQuestions: mockQuestions.data
            }, () => {
                // this.changeIndex(0)
                this.getQuestions()
            })
        }
    }

    getAllQuestionsError = (err) => {
        changeSpinnerFlag(this.props, false)
        console.log("err " + JSON.stringify(err))
    }
    updateText(value, key) {
        var states = this.state;
        states[key] = value;
        this.setState({
            states
        })
    }

    saveHealthRecords() {
        changeSpinnerFlag(this.props, true)
        var data = {
            "data": this.state.listOfQuestions
        }
        post(
            ApiUrl.updateUserAnswer,
            data,
            this.saveHealthRecordsSuccess,
            this.saveHealthRecordsError
        )
    }

    saveHealthRecordsSuccess = success => {
        changeSpinnerFlag(this.props, false);
        console.log(success)
        if (success.success) {
            this.updateText(success.message, "errorMessage")
            this.updateText(true, "errorMessageFlag")
            this.props.navigation.navigate("FinalPage")
            // this.changeIndex(0)
            // this.changeIndex(0)

        } else {
            this.updateText(success.message, "errorMessage")
            this.updateText(true, "errorMessageFlag")
        }
    }

    saveHealthRecordsError = error => {
        console.log(error)
        changeSpinnerFlag(this.props, false)
        // ErrorAlert(success.message)
        this.updateText(error.message, "errorMessage")
        this.updateText(true, "errorMessageFlag")
    }



    saveDraft() {
        changeSpinnerFlag(this.props, true)
        var data = {
            "data": this.state.listOfQuestions
        }
        post(
            ApiUrl.updateUserAnswer,
            data,
            this.saveDraftSuccess,
            this.saveDraftError
        )
    }

    saveDraftSuccess = success => {
        changeSpinnerFlag(this.props, false);
        if (success.success) {
            this.updateText(success.message, "errorMessage")
            this.updateText(true, "errorMessageFlag")
        } else {
            this.updateText(success.message, "errorMessage")
            this.updateText(true, "errorMessageFlag")
        }
    }

    saveDraftError = error => {
        changeSpinnerFlag(this.props, false)
        this.updateText(error.message, "errorMessage")
        this.updateText(true, "errorMessageFlag")
    }

    changeIndex(index) {

        // this.saveHealthRecords()
        // console.log("=======================<" + this.state.totalQuetions % 10)

        // this.props.navigation.navigate("FinalPage")
        // console.log("=======================<" + this.state.totalQuetions % 10)
        // 71
        if (index == 71) {
            this.saveHealthRecords()
        } else {
            this.setState({
                currentQuestionDetails: this.state.listOfQuestions[index]
            })
            this.refs.scroll.scrollTo({ x: width * index })
            // if (this.state.totalQuetions == index) {
            //     var states = this.state
            //     if (this.state.totalQuetions % 10 == 0 && this.state.totalQuetions <= this.state.listOfQuestions.length) {
            //         states["totalQuetions"] = this.state.totalQuetions + 10
            //     } else if (this.state.totalQuetions < this.state.listOfQuestions.length) {
            //         var num = this.state.totalQuetions % 10
            //         states["totalQuetions"] = this.state.totalQuetions + num
            //     }
            //     this.setState({
            //         states
            //     }, () => {
            //         this.getQuestions()
            //     })
            // }
        }

        // this.props.navigation.navigate("FinalPage")

        // this.props.navigation.navigate("FinalPage")
    }


    selectedButtonAnswer(answer, index) {
        var { listOfQuestions } = this.state
        listOfQuestions[index]["answer"] = answer
        this.setState({ listOfQuestions })
    }

    changesTextboxAnswer(answer, index) {
        var { listOfQuestions } = this.state
        listOfQuestions[index]["answer"] = answer
        this.setState({ listOfQuestions })
    }


    async doLogout() {
        await removeValue(storageKeys.loginDetails).then(() => {
            console.log("removeValue ===========> ")
        })
        this.props.navigation.navigate("EmailIdScreen")
        // this.props.navigation.navigate("EmailIdScreen")
    }




    progressBar() {
        var data = this.state.currentQuestionDetails
        var qNo = data?.parentQuestionNo ? data.parentQuestionNo : data?.questionNo ? data.questionNo : 1


        return (
            <View style={{ marginHorizontal: 10, marginVertical: 25, height: 40, position: "absolute", width: DeviceWidth - 100 }}>
                <View style={{}}>
                    <View style={{ backgroundColor: colors.borderColor, height: 40, borderRadius: 45, flexDirection: "row" }}>
                        <View style={{ backgroundColor: colors.themeColor, flex: flexValidation(qNo), height: 40, borderRadius: 45, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", color: colors.white }}>{qNo + " / 17"}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        var { listOfQuestions } = this.state
        let { ids } = responsiveStyle.getSheet();
        return (
            // <View style={{flex:1}}>
            <ScrollView style={{ flex: 1 }}>
                <ImageBackground resizeMode="center" source={require("../../assets/images/backgroundImage1.png")}
                // style={[styles.container,Platform.OS == "web" ? {flexDirection:"row",flex:0.5}:{}]}
                >
                    {this.progressBar()}

                    <ScrollView
                        scrollEnabled={false}
                        animation={false}
                        horizontal={true}
                        // pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        ref={'scroll'}
                    >
                        {
                            listOfQuestions.length > 0 ?
                                listOfQuestions.map((data, index) => {
                                    return (
                                        <View style={{ flex: 1, width: "100%" }}>
                                            <ScrollView>
                                                <View key={index} style={[{ justifyContent: 'space-between', height: height, width: width, paddingHorizontal: 20 }]} >
                                                    <View>
                                                        <View style={{ width: "100%", alignSelf: "center" }}>
                                                            {
                                                                <Surface style={[{ elevation: 4, borderColor: "#000000", marginTop: 15, alignItems: "flex-end", alignSelf: "flex-end" }, styles.backButtonStyle]}>
                                                                    <TouchableOpacity style={styles.backButtonStyle} onPress={() => {
                                                                        this.doLogout()
                                                                    }}>
                                                                        <Image source={require("../../assets/images/logout.png")} style={{ height: 25, width: 25 }} />
                                                                    </TouchableOpacity>
                                                                </Surface>
                                                            }
                                                        </View>
                                                    </View>
                                                    <View style={{ alignItems: "center" }}>
                                                        <Question data={data} />
                                                        {
                                                            data && data.message && data.message.length > 0 ?
                                                                data.message.map((msg, index) => {
                                                                    return (
                                                                        <QuestionMessage key={index} msg={msg} />
                                                                    )
                                                                })
                                                                : null
                                                        }

                                                        {
                                                            data.image && data.image.length > 0 ?
                                                                <Image dataSet={{ media: ids.faceImage }} source={{ uri: data.image[0] }} resizeMode={"contain"} style={{ height: 250, width: width }} />
                                                                :
                                                                null
                                                        }

                                                        {
                                                            data && (data.dataType == "String" || data.dataType == "Email" || data.dataType == "Date" || data.dataType == "Number") ?
                                                                <TextBox index={index} data={data} changeText={this.changesTextboxAnswer.bind(this)} />
                                                                :
                                                                <MultiselectButton index={index} data={data} selectedButtonAnswer={this.selectedButtonAnswer.bind(this)} />
                                                        }
                                                        {/* <View style={Platform.OS == "web" ? { width: "50%", alignItems: "center" } : {}}>
                                                    <CommonButton errorMessageFunction={(msg, flag) => {
                                                        this.updateText(msg, "errorMessage")
                                                        this.updateText(flag, "errorMessageFlag")
                                                    }} changeIndex={this.changeIndex.bind(this)} index={index} allQuestions={listOfQuestions} data={data} />
                                                </View> */}
                                                    </View>

                                                    <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", width: "80%", alignSelf: "center" }}>
                                                        {
                                                            index === 0 ?
                                                                <View />
                                                                :

                                                                <View
                                                                //  style={Platform.OS == "web" ? { width: "50%", alignItems: "center" } : {}}
                                                                >

                                                                    <TouchableOpacity dataSet={{ media: ids.bootomButton }} style={styles.buttonStyle} onPress={() => {
                                                                        var index = this.props.backNavigationList.length - 1
                                                                        this.changeIndex(this.props.backNavigationList[index])
                                                                        // var afterRemoveLastData = this.props.backNavigationList.pop();
                                                                        this.props.backNavigationList.pop();
                                                                        // var afterRemoveLastData = this.props.backNavigationList.splice(index,1) 
                                                                        const { dispatch } = this.props
                                                                        dispatch({ type: ActionTypes.BACK_NAVIGATIONS, payload: this.props.backNavigationList })
                                                                    }}>
                                                                        <Text dataSet={{ media: ids.bootomButtonText }} style={styles.buttonTextStyle}>{"Back"}</Text>
                                                                    </TouchableOpacity>
                                                                    {/* <Surface dataSet={{ media: ids.backIconButton }} style={[{ elevation: 4, borderColor: "#000000" }, styles.backButtonStyle,]}>
                                                                        <TouchableOpacity dataSet={{ media: ids.backButtonsStyle }} style={styles.backButtonStyle} onPress={() => {
                                                                            var index = this.props.backNavigationList.length - 1
                                                                            this.changeIndex(this.props.backNavigationList[index])
                                                                            // var afterRemoveLastData = this.props.backNavigationList.pop();
                                                                            this.props.backNavigationList.pop();
                                                                            // var afterRemoveLastData = this.props.backNavigationList.splice(index,1) 
                                                                            const { dispatch } = this.props
                                                                            dispatch({ type: ActionTypes.BACK_NAVIGATIONS, payload: this.props.backNavigationList })

                                                                        }}>
                                                                            <Image dataSet={{ media: ids.backIcon }} source={require("../../assets/images/back-arrow.png")} style={{ height: 25, width: 25 }} />
                                                                        </TouchableOpacity>
                                                                    </Surface> */}
                                                                </View>
                                                        }
                                                        <View
                                                        //  style={Platform.OS == "web" ? { width: "50%", alignItems: "center" } : {}}
                                                        >

                                                            <TouchableOpacity dataSet={{ media: ids.bootomButton }} style={styles.buttonStyle} onPress={() => {
                                                                this.saveDraft()
                                                            }}>
                                                                <Text dataSet={{ media: ids.bootomButtonText }} style={styles.buttonTextStyle}>{"SAVE DRAFT"}</Text>
                                                            </TouchableOpacity>
                                                            {/* <CommonButton errorMessageFunction={(msg, flag) => {
                                                        this.updateText(msg, "errorMessage")
                                                        this.updateText(flag, "errorMessageFlag")
                                                    }} changeIndex={this.changeIndex.bind(this)} index={index} allQuestions={listOfQuestions} data={data} /> */}
                                                        </View>

                                                        <View
                                                        // style={Platform.OS == "web" ? { width: "50%", alignItems: "center" } : {}}
                                                        >
                                                            <CommonButton errorMessageFunction={(msg, flag) => {
                                                                this.updateText(msg, "errorMessage")
                                                                this.updateText(flag, "errorMessageFlag")
                                                            }} changeIndex={this.changeIndex.bind(this)} index={index} allQuestions={listOfQuestions} data={data} />
                                                        </View>
                                                        {/* <View/> */}
                                                    </View>

                                                </View>
                                            </ScrollView>
                                        </View>
                                    )
                                })
                                : null
                        }

                        <ModalPoup visible={this.state.errorMessageFlag} children={this.state.errorMessage} callBack={() => {
                            this.updateText("", "errorMessage")
                            this.updateText(false, "errorMessageFlag")
                        }} />



                        {/* <FlatList
                        data={listOfQuestions}
                        horizontal={true}
                        // initialScrollIndex={}
                        renderItem={({item,index}) => {
                            // console.log("dat ============= > "+JSON.stringify(item))
                            var data = item;
                            
                            return (
                                <View key={index} style={{ justifyContent: "space-between", flex: 1, width: width, paddingHorizontal: 20 }} >
                                    <View>
                                        {
                                            <Surface style={[{ elevation: 4, borderColor: "#000000", marginTop: 15, alignItems: "flex-end", alignSelf: "flex-end" }, styles.backButtonStyle]}>
                                                <TouchableOpacity style={styles.backButtonStyle} onPress={() => {
                                                    this.doLogout()
                                                }}>
                                                    <Image source={require("../../assets/images/logout.png")} style={{ height: 25, width: 25 }} />
                                                </TouchableOpacity>
                                            </Surface>
                                        }
                                    </View>
                                    <View>
                                        <Question data={data} />
                                        {
                                            data && data.message && data.message.length > 0 ?
                                                data.message.map((msg, index) => {
                                                    return (
                                                        <QuestionMessage key={index} msg={msg} />
                                                    )
                                                })
                                                : null
                                        }

                                        {
                                            data && (data.dataType == "String" || data.dataType == "Email" || data.dataType == "Date" || data.dataType == "Number") ?
                                                <TextBox index={index} data={data} changeText={this.changesTextboxAnswer.bind(this)} />
                                                :
                                                <MultiselectButton index={index} data={data} selectedButtonAnswer={this.selectedButtonAnswer.bind(this)} />
                                        }

                                        <CommonButton changeIndex={this.changeIndex.bind(this)} index={index} allQuestions={listOfQuestions} data={data} />
                                    </View>

                                    {
                                        index === 0 ?
                                            <View />
                                            :


                                            <Surface style={[{ elevation: 4, borderColor: "#000000", marginBottom: 15 }, styles.backButtonStyle]}>
                                                <TouchableOpacity style={styles.backButtonStyle} onPress={() => {
                                                    var index = this.props.backNavigationList.length - 1
                                                    this.changeIndex(this.props.backNavigationList[index])
                                                    // var afterRemoveLastData = this.props.backNavigationList.pop();
                                                    this.props.backNavigationList.pop();
                                                    // var afterRemoveLastData = this.props.backNavigationList.splice(index,1) 
                                                    const { dispatch } = this.props
                                                    dispatch({ type: ActionTypes.BACK_NAVIGATIONS, payload: this.props.backNavigationList })

                                                }}>
                                                    <Image source={require("../../assets/images/back-arrow.png")} style={{ height: 25, width: 25 }} />
                                                </TouchableOpacity>
                                            </Surface>
                                    }
                                </View>
                            )
                        }}
                        keyExtractor={(item) => {
                            // console.log("index"+JSON.stringify(item.indexNo))
                            // item.indexNo.toString()
                            item.indexNo.toString()
                        }}
                    /> */}

                    </ScrollView>

                </ImageBackground>
            </ScrollView>
        );
    };
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    backButtonStyle: {
        height: 60,
        width: 60,
        borderRadius: 45,
        backgroundColor: colors.themeColor,
        justifyContent: "center", alignItems: "center"
    },
    buttonStyle: {
        backgroundColor: colors.themeColor,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 5,
        alignSelf: "center",
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

export default connect(mapStateToProps)(Home);
