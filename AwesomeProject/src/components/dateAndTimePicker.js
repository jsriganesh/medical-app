//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import moment from "moment";

// create a component
export const DatePicker = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);

    const onConfirm = (event) => {
        var newDate = moment(event).format("DD/MM/YYYY")
        props.selectedDate(newDate)
    };
    const onCancel = () => {
        props.selectedDate(props.date)
    };

    return (
        <View>
            <DateTimePickerModal
                testID="dateTimePicker"
                date={props.date ? moment(props.date, "DD/MM/YYYY").toDate() : date}
                isVisible={show}
                mode={mode}
                is24Hour={false}
                display={Platform.OS === 'ios' ? "inline" : "default"}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
        </View>
    );
};



export const TimePicker = (props) => {
    const [time, setTime] = useState(props.time ? props.time : new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(true);

    const onConfirm = (event) => {
        var newTime = moment(event).format("HH:mm a")
        props.selectedTime(newTime)
    };
    const onCancel = () => {
        props.selectedTime(props.time)
    };

    return (
        <View>
            <DateTimePickerModal
                testID="dateTimePicker"
                // date={time}
                value={time}
                
                isVisible={show}
                mode={mode}
                is24Hour={false}
                display={Platform.OS === 'ios' ? "inline" : "default"}
                onCancel={onCancel}
                onConfirm={onConfirm}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
