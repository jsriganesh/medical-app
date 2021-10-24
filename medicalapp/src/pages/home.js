//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Question, QuestionMessage, TextBox, CommonButton } from "../components/commonComponents"
// create a component
const { width } = Dimensions.get('window')

var dummyQuestions = require("../../CNM_mock_questions.json")

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
            offset: 0
        }
    }



    
    changeIndex(index) {
        console.log(index)
            this.refs.scroll.scrollTo({ x: index })
        }


    render() {
        return (

            <View style={styles.container}>
                <ScrollView
                    scrollEnabled={false}

                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    ref={'scroll'}
                >
                    {
                        dummyQuestions.data.length > 0 ?
                            dummyQuestions.data.map((data, index) => {
                                return (
                                    <View key={index} style={{ justifyContent: "center", flex: 1, width: width, paddingHorizontal: 20 }} >
                                        <Question questionNo={data.questionNo} question={data.question} manditaory={data.manditaory} />
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
                                            data.dataType == "String" ?
                                                <TextBox />
                                                : null
                                        }

                                        <CommonButton changeIndex={this.changeIndex.bind(this)} index = {index} btnText={data.buttonName} />

                                    </View>
                                )
                            })
                            : null
                    }
                </ScrollView>

            </View>
        );
    };
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default Home;
