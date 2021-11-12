//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import colors from '../utils/colors';
import { ActionTypes } from '../redux/action/actionList';
import { connect } from "react-redux";


const mapStateToProps = (state) => ({
    isGenderQuestion: state.selectedValidationQuestion.isGenderQuestion,
});



const optionNumber = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

// create a component
const MultiselectButton = ({ data, selectedButtonAnswer, index, isGenderQuestion, dispatch }) => {
    const [selectedButtonsList, updateSelectedButton] = useState(data.answer ? data.answer :[])

    function removeDuplicate(datas) {
        var nameListJsonObject = datas.map(JSON.stringify);
        var nameListUniqueSet = new Set(nameListJsonObject);
        var nameListUniqueArray = Array.from(nameListUniqueSet).map(JSON.parse);
        return nameListUniqueArray;
    }

    function updateButtons(selectedvalue) {

        // var { selectedButtonsList } = this.state;


        if (data.minSelect == 1 && data.maxSelect == 1) {
            var singleData = [selectedvalue]
            updateSelectedButton(singleData)
            selectedButtonAnswer(singleData, index)
        } else {

            var getSelectedValue;
            var spliceData;

            if (selectedButtonsList.length > 0) {
                for (var i = 0; i < selectedButtonsList.length; i++) {
                    if (selectedButtonsList[i].option == selectedvalue.option) {
                        spliceData = selectedButtonsList[i];
                        selectedButtonsList.splice(i, 1)
                        var removeData = removeDuplicate(selectedButtonsList);
                        updateSelectedButton(removeData)
                        selectedButtonAnswer(removeData, index)
                        return
                    } else {
                        if (spliceData && spliceData.option !== selectedvalue.option) {
                        } else {
                            getSelectedValue = selectedvalue
                        }
                    }
                }

                if (getSelectedValue) {
                    if (data.maxSelect > selectedButtonsList.length) {
                        selectedButtonsList.push(selectedvalue);
                    }
                }
            } else {
                if (data.maxSelect > selectedButtonsList.length) {
                    selectedButtonsList.push(selectedvalue)
                }
            }

            var removeData = removeDuplicate(selectedButtonsList);
            updateSelectedButton(removeData)
            selectedButtonAnswer(removeData, index)
        }

    }


    var optionList = [];
    if (isGenderQuestion == "Male") {
        optionList = data.optionListMale
    } else if (isGenderQuestion == "Female") {
        optionList = data.optionListFemale
    } else {
        optionList = data.optionList
    }



    return (
        <View style={styles.container}>
            {/* {
                data.optionList.length > 0 ?
                data.optionList.map((option, index) => {
                    if(isGenderQuestion == option.type || option.type == null ||  option.type == undefined){
                        const found = selectedButtonsList.some(
                            (el) => el.option === option.option
                        );
                        return (
                            <TouchableOpacity key={index} style={[styles.ButtonStyle, found ? { borderColor: colors.themeColor } : {}]} onPress={() => {
                                if (data.isGenderQuestion) {
                                    dispatch({ type: ActionTypes.SELECTED_GENDER, payload: option.option })

                                } else {

                                }
                                updateButtons(option)
                            }}>
                                <View style={[styles.optionButtonStyle, found ? { backgroundColor: colors.themeColor } : {}]}>
                                    <Text style={[styles.optionButtonTextStyle, found ? { color: colors.white } : {}]} >{optionNumber[index]}</Text>
                                </View>
                                <Text>

                                    {option.option}</Text>
                            </TouchableOpacity>
                        )
                    }
                    })
                    : null
            } */}


            {
                <FlatList
                    numColumns={2}
                    data={data.optionList}
                    renderItem={( option, index) => {
                        if (isGenderQuestion == option.item.type || option.item.type == null || option.item.type == undefined) {
                            const found = selectedButtonsList.some(
                                (el) => el.option === option.item.option
                            );
                            return (
                                <TouchableOpacity key={option.index} style={[styles.ButtonStyle, found ? { borderColor: colors.themeColor } : {},
                                    {flex:0.5,width:"100%"}
                                ]} onPress={() => {
                                    if (data.isGenderQuestion) {
                                        dispatch({ type: ActionTypes.SELECTED_GENDER, payload: option.item.option })

                                    } else {

                                    }
                                    updateButtons(option.item)
                                }}>
                                    <View style={[styles.optionButtonStyle, found ? { backgroundColor: colors.themeColor } : {}]}>
                                        <Text style={[styles.optionButtonTextStyle, found ? { color: colors.white } : {}]} >{optionNumber[option.index]}</Text>
                                    </View>
                                    <Text numberOfLines={5} style={{flex:1,color: colors.themeColor}} >

                                        {option.item.option}</Text>
                                </TouchableOpacity>
                            )
                        }
                    }}
                />
            }

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: colors.buttonBackgroundColor,
        paddingVertical: 5,
        // height: 45,
        paddingRight: 20,
        // padding: 20,
        marginHorizontal: 8,
        marginVertical: 4,
        borderRadius: 6,
        borderWidth: 2,
        flexDirection: "row",
        borderColor: colors.borderColor,
        alignItems: "center",
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",

        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    optionButtonStyle: {
        marginHorizontal: 10, alignItems: "center", justifyContent: "center", height: 30, width: 30, borderRadius: 4, borderWidth: 1, borderColor: colors.borderColor, backgroundColor: colors.white
    },
    optionButtonTextStyle: { fontWeight: "bold", color: colors.themeColor }
});

// export default MultiselectButton;
export default connect(mapStateToProps)(MultiselectButton);
