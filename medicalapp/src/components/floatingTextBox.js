//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Animated } from 'react-native';
import { Colors } from 'react-native-paper';
// import { TextInput, } from 'react-native-paper';
import colors from '../utils/colors';


// create a component
class FloationTextBox extends Component {
    // const [isFocused,setFocused] = useState(false)
    constructor(props) {
        super(props)
        this.state = {
            isFocused: false,
            value:this.props.value
        };
        this._animatedIsFocused = new Animated.Value(0);
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: this.state.value? true : false });
    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: this.state.isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: false 
        }).start();
    }


    render() {

        const labelStyle = {
            position: 'absolute',
            left: 0,
            backgroundColor: "white",
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 2],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 12],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['green', colors.themeColor],
            }),
        };

        const labelAsteriskStyle = {
            position: 'absolute',
            right: 0,
            backgroundColor: "white",
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 2],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 12],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['red', colors.red],
            }),
        };


        return (
            
            <View style={{ marginTop: 20 }}>
                <View style={{ marginLeft: 15,backgroundColor:colors.white }}>
                    <View>
                        <Animated.Text style={labelStyle}>
                            {" "}{this.props.labels}
                            {
                                this.props.showMandatory ?
                                    <Animated.Text style={labelAsteriskStyle}>
                                        {" * "}
                                    </Animated.Text>
                                    : null
                            }
                            
                        </Animated.Text>
                    </View>
                </View>
                <TextInput
                    value={this.state.value}
                    placeholderTextColor={"#7E84A3"} style={[
                        styles.floatingTextBoxStyle,
                        this.state.isFocused ?
                            {color:"#7E84A3", paddingHorizontal:15,backgroundColor: colors.white, borderColor: colors.themeColor, borderWidth: 2, marginTop: 10, zIndex: -1 } : {},

                    ]}
                    
                    onChangeText={(text)=>{
                        this.setState({value:text},()=>{
                            this.props.onChangeValue(text,this.props.componentKey)
                        })
                    }}

                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                />
                {
                    !this.state.isFocused?
                    <Text style={{position:"absolute",fontSize:14,marginLeft:10,marginTop:15,color:"#7E84A3"}}>{this.props.labels}
                    {
                        this.props.showMandatory ? 
                        <Text style={{color:colors.red}}>{" * "}</Text>
                        : null
                    }
                    
                    </Text>
                    : null
                }

            </View>
        )
    }
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    floatingTextBoxStyle: {
        width: "100%",
        borderRadius: 6,
        backgroundColor: Colors.white,
        alignSelf: "center",
        height: 45,
        borderWidth:2,
        paddingHorizontal: 10,
        // marginTop: 50
    },
});

//make this component available to the app
export default FloationTextBox;
