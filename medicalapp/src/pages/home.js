//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Question, QuestionMessage, TextBox } from "../components/commonComponents"
import CommonButton from "../components/commonButton"
import MultiselectButton from "../components/multiSelectButton"
import colors from '../utils/colors';
import { Surface } from 'react-native-paper';
import { connect } from "react-redux";
import { ActionTypes } from '../redux/action/actionList';

import { post } from "../services/apiService"
import { ApiUrl } from "../services/apiUrl"
import { changeSpinnerFlag, ErrorAlert, SuccessAlert } from '../components/commonFunctions';
import { removeValue, storageKeys } from "../components/asyncStorage"
const { width } = Dimensions.get('window')
var mockQuestions = require("../../CMD_new_questions.json")
import ModalPoup from "../components/toast"

const mapStateToProps = (state) => ({
    backNavigationList: state.backNavigationListReducer.backNavigationList,
});


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
            errorMessageFlag: false
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
            this.props.navigation.navigate("FinalPage")
            this.updateText(success.message, "errorMessage")
            this.updateText(true, "errorMessageFlag")
            // SuccessAlert(success.message)
            // this.changeIndex(0)
            // this.props.navigation.navigate("FinalPage")
            // this.changeIndex(0)

        } else {
            this.updateText(success.message, "errorMessage")
            this.updateText(true, "errorMessageFlag")
            // ErrorAlert(success.message)
        }
    }

    saveHealthRecordsError = error => {
        console.log(error)
        changeSpinnerFlag(this.props, false)
        // ErrorAlert(success.message)
        this.updateText(error.message, "errorMessage")
        this.updateText(true, "errorMessageFlag")
    }

    changeIndex(index) {

        console.log("=======================<" + this.state.totalQuetions % 10)
        // 71
        if (index == 71) {
            this.saveHealthRecords()
        } else {
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
        await removeValue(storageKeys.loginDetails).then(()=>{
            console.log("removeValue ===========> ")
        })
        this.props.navigation.navigate("EmailIdScreen")
        // this.props.navigation.navigate("EmailIdScreen")
    }

    render() {
        var { listOfQuestions } = this.state
        return (
            <ImageBackground resizeMode="center" source={require("../../assets/images/backgroundImage1.png")} style={styles.container}>
                <ScrollView
                    scrollEnabled={false}
                    animation={false}
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    ref={'scroll'}
                >
                    {
                        listOfQuestions.length > 0 ?
                            listOfQuestions.map((data, index) => {
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
                                                data.image && data.image.length > 0 ? 
                                                <Image source={{uri:data.image[0]}} style={{marginVertical:20,height:300,width:800}}/>
                                                :
                                                null
                                            }

                                            {
                                                data && (data.dataType == "String" || data.dataType == "Email" || data.dataType == "Date" || data.dataType == "Number") ?
                                                    <TextBox index={index} data={data} changeText={this.changesTextboxAnswer.bind(this)} />
                                                    :
                                                    <MultiselectButton index={index} data={data} selectedButtonAnswer={this.selectedButtonAnswer.bind(this)} />
                                            }

                                            <CommonButton errorMessageFunction={(msg,flag)=>{
                                                 this.updateText(msg, "errorMessage")
                                                 this.updateText(flag, "errorMessageFlag")
                                            }} changeIndex={this.changeIndex.bind(this)} index={index} allQuestions={listOfQuestions} data={data} />
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
    }
});

//make this component available to the app

export default connect(mapStateToProps)(Home);
