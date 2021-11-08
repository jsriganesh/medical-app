//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Question, QuestionMessage, TextBox } from "../components/commonComponents"
import CommonButton from "../components/commonButton"
// create a component
const { width } = Dimensions.get('window')
import MultiselectButton from "../components/multiSelectButton"
import colors from '../utils/colors';
// var mockQuestions = require("../../CNM_mock_questions.json")
var mockQuestions = require("../../CMD_new_questions.json")
import { Surface } from 'react-native-paper';
import { connect } from "react-redux";
import { ActionTypes } from '../redux/action/actionList';

const mapStateToProps = (state) => ({
    backNavigationList: state.backNavigationListReducer.backNavigationList,
});


const data = {
    "questionNo": 1,
    "question": "What's your first name?",
    "mandatory": true,
    "message": [],
    "dataType": "String",
    "optionList": [],
    "minSelect": 0,
    "maxSelect": 0,
    "minLength": 2,
    "maxLength": 20,
    "image": "",
    "answer": "",
    "subQuestions": [],
    "buttonName": "OK"
}

class Home extends Component {


    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            dummyQuestions: mockQuestions.data,
            // type : "next"
        }
    }



    changeIndex(index) {
        this.refs.scroll.scrollTo({ x: width * index })
    }


    selectedButtonAnswer(answer, index) {
        var { dummyQuestions } = this.state
        dummyQuestions[index]["answer"] = answer
        this.setState({ dummyQuestions })
    }

    changesTextboxAnswer(answer, index) {
        console.log(index, answer)
        var { dummyQuestions } = this.state
        dummyQuestions[index]["answer"] = answer
        this.setState({ dummyQuestions })
    }

    render() {
        var { dummyQuestions } = this.state
        return (
            <ImageBackground resizeMode="center" source={require("../../assets/images/backgroundImage1.png")} style={styles.container}>
                <ScrollView
                    scrollEnabled={false}

                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    ref={'scroll'}
                >
                    {
                        dummyQuestions.length > 0 ?
                            dummyQuestions.map((data, index) => {
                                return (
                                    <View key={index} style={{ justifyContent: "space-between", flex: 1, width: width, paddingHorizontal: 20 }} >
                                        <View>
                                            {
                                                <Surface style={[{ elevation: 4, borderColor: "#000000", marginTop: 15, alignItems: "flex-end", alignSelf: "flex-end" }, styles.backButtonStyle]}>
                                                    <TouchableOpacity style={styles.backButtonStyle} onPress={() => {
                                                            this.props.navigation.navigate("LoginPage")
                                                    }}>
                                                        <Image source={require("../../assets/images/logout.png")} style={{ height: 25, width: 25 }} />
                                                    </TouchableOpacity>
                                                </Surface>
                                            }
                                        </View>
                                        <View>
                                            <Question data={data} />
                                            {
                                                data.message.length > 0 ?
                                                    data.message.map((msg, index) => {
                                                        return (
                                                            <QuestionMessage key={index} msg={msg} />
                                                        )
                                                    })
                                                    : null
                                            }

                                            {
                                                data.dataType == "String" || data.dataType == "Email" || data.dataType == "Date" || data.dataType == "Number" ?
                                                    <TextBox index={index} data={data} changeText={this.changesTextboxAnswer.bind(this)} />
                                                    :
                                                    <MultiselectButton index={index} data={data} selectedButtonAnswer={this.selectedButtonAnswer.bind(this)} />
                                            }

                                            <CommonButton changeIndex={this.changeIndex.bind(this)} index={index} allQuestions={dummyQuestions} data={data} />
                                        </View>

                                        {
                                            index === 0 ?
                                                <View />
                                                :


                                                <Surface style={[{ elevation: 4, borderColor: "#000000", marginBottom: 15 }, styles.backButtonStyle]}>
                                                    <TouchableOpacity style={styles.backButtonStyle} onPress={() => {
                                                        // console.log(this.props.backNavigationList)
                                                        var index = this.props.backNavigationList.length - 1
                                                        this.changeIndex(this.props.backNavigationList[index])
                                                        // var afterRemoveLastData = this.props.backNavigationList.pop();
                                                        this.props.backNavigationList.pop();
                                                        // console.log(this.props.backNavigationList)
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
