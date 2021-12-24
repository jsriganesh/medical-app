import React, { Component } from "react";
import StyleSheet from "react-native-media-query";

import { colors } from '../utils/colors';

export default class StyleSheetFactory {
    static getSheet(themecolor) {
        return StyleSheet.create({
            emailContainerView: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                    padding: 10
                },
            },
            emailButtonView: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                    width: "100%",
                    alignSelf: "center"
                },
            },
            modalContainer: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                    width: "90%",
                },
                "@media (max-width: 500px)": {
                    width: "90%",
                },
                "@media (max-width: 800px) and (min-width: 500px)": {
                    width: "90%",
                },


            },
            homeQuestionText: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                },
                "@media (max-width: 500px)": {
                    textAlign: 'center'
                },
                "@media (max-width: 800px) and (min-width: 500px)": {
                    Number: 2
                },


            },
            multipleQuestionContainer: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                },
                "@media (max-width: 500px)": {
                    // textAlign:'center'
                },
                "@media (max-width: 800px) and (min-width: 500px)": {
                    // textAlign:'center'
                },
                "@media (max-width: 1800px) and (min-width: 800px)": {

                    flexDirection: "row",
                    flexWrap: "wrap",
                    // flex: 1,
                    alignItems: 'center',
                    alignSelf: "center",
                    justifyContent: 'center',

                    // backgroundColor: '#2c3e50',

                },


            },

            buttonWidthView: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                    width: "100%"
                },
                "@media (max-width: 500px)": {
                    width: "100%"
                },
                "@media (max-width: 800px) and (min-width: 500px)": {
                    width: "100%"
                },
                "@media (max-width: 1800px) and (min-width: 800px)": {

                    minWidth:"40%",
                    // width: "40%"

                },


            },

            faceImage: {
                "@media (max-width: 300px) and (min-width: 280px)": {

                    // width: "100%",
                    // height: "100%"
                },
                "@media (max-width: 500px)": {
                    // width: 400,
                    // height: "90%",

                },
                "@media (max-width: 800px) and (min-width: 500px)": {


                },
                "@media (max-width: 1800px) and (min-width: 800px)": {
                    width: 800,
                    height: 300,
                },


            },

            bootomButton: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                    backgroundColor: colors.themeColor,
                    paddingHorizontal: 10,
                    paddingVertical: 0,
                    borderRadius: 5,
                    alignSelf: "center",
                    marginVertical: 10
                },
                "@media (max-width: 500px)": {
                    backgroundColor: colors.themeColor,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    alignSelf: "center",
                    marginVertical: 20

                },
                "@media (max-width: 800px) and (min-width: 500px)": {


                },


            },

            bootomButtonText: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "bold",
                },
                "@media (max-width: 500px)": {
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "bold",

                },
                "@media (max-width: 800px) and (min-width: 500px)": {

                    color: colors.white,
                    fontSize: 14,
                    fontWeight: "bold",
                },
                "@media (max-width: 1800px) and (min-width: 800px)": {

                },


            },

            backIconButton: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                    height: "10%",
                    width: "10%",
                    borderRadius: 45,
                    backgroundColor: colors.themeColor,
                    alignSelf:"cenetrt"
                },
                "@media (max-width: 500px)": {
                    height: "10%",
                    width: "10%",
                    borderRadius: 25,
                    backgroundColor: colors.themeColor,
                    alignSelf:"center",
                    justifyContent:''
                   

                },
                "@media (max-width: 800px) and (min-width: 500px)": {

                },
                "@media (max-width: 1800px) and (min-width: 800px)": {

                },


            },
            backIcon: {
                "@media (max-width: 300px) and (min-width: 280px)": {
                    height: 15,
                    width: 15
                },
                "@media (max-width: 500px)": {
                    height: 15,
                    width: 15

                },
                "@media (max-width: 800px) and (min-width: 500px)": {

                    height: 15,
                    width: 15
                },
                "@media (max-width: 1800px) and (min-width: 800px)": {

                },

                backButtonsStyle: {
                    "@media (max-width: 300px) and (min-width: 280px)": {
                        height: "10%",
                        width: "10%",
                        // borderRadius: 45,
                        backgroundColor: colors.themeColor,
                       
                    },
                    "@media (max-width: 500px)": {
                        height: "10%",
                        width: "10%",

                    },
                    "@media (max-width: 800px) and (min-width: 500px)": {

                        height: 25,
                        width: 25
                    },
                    "@media (max-width: 1800px) and (min-width: 800px)": {


                    },


                },


            },



        });
    }
}