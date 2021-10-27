//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ImageBackground,Image } from 'react-native';
import { Question, QuestionMessage, TextBox } from "../components/commonComponents"
import  CommonButton  from "../components/commonButton"
// create a component
const { width } = Dimensions.get('window')
import MultiselectButton from "../components/multiSelectButton"
import colors from '../utils/colors';
var mockQuestions = require("../../CNM_mock_questions.json")
import { Surface } from 'react-native-paper';

const data = {
    "questionNo": 1,
    "question": "What's your first name?",
    "manditaory": true,
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

    render() {
        var { dummyQuestions } = this.state
        return (
            <ImageBackground resizeMode="center"  source={require("../../assets/images/backgroundImage1.png")}  style={styles.container}>
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
                                        <View></View>
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
                                                    <TextBox />
                                                    :
                                                    <MultiselectButton index={index} data={data} selectedButtonAnswer={this.selectedButtonAnswer.bind(this)} />
                                            }

                                            <CommonButton changeIndex={this.changeIndex.bind(this)} index={index} allQuestions={dummyQuestions} data={data} />
                                        </View>
                                        <Surface style={[{ elevation: 4, borderColor: "#000000", marginBottom: 15 }, styles.backButtonStyle]}>
                                            <TouchableOpacity style={styles.backButtonStyle}>
                                                <Image source={require("../../assets/images/back-arrow.png")} style={{ height: 25, width: 25 }} />
                                            </TouchableOpacity>
                                        </Surface>
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
export default Home;
