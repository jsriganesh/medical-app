//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';


// create a component
export const ModalComponent = (props) => {

    // define your styles
    const styles = StyleSheet.create({
        modalOverlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            right: 0,
        },
        modalContentContainer: {
            position: "absolute",
            // height: props.modalHeight,
            width: "100%",
            bottom: 0,
            justifyContent: "flex-start",
            marginTop: 22,
            paddingHorizontal: 30,
            backgroundColor: "white",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            // alignItems: "center",
        },
        typesOfConsultationsModalTopNotch: {
            marginBottom: 20,
            backgroundColor: "#35405233",
            borderRadius: 10,
            // alignItems: "center",
            width: 100,
            height: 6
        },
    });
    const onClose = () => {
        props.onClose()
    };
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <TouchableWithoutFeedback onPress={props.canClose ? onClose : null}>
                <View style={[styles.modalOverlay]} />
            </TouchableWithoutFeedback>
            <View style={styles.modalContentContainer}>
                <View style={[styles.typesOfConsultationsModalTopNotch, { marginVertical: 20, alignItems: "center", alignSelf: "center" }]}></View>
                {props.innerElement}
            </View>
        </View>
    );

};

//make this component available to the app
