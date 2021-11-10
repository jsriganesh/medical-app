//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RootNavigation from './navigations';
import store from "./src/redux/store/store";
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
import { getData, storageKeys } from "./src/components/asyncStorage"

// create a component
class App extends Component {
  constructor(props){
    super(props)
    this.state={
      accessToken:""
    }
  }

 async componentDidMount(){
    SplashScreen.hide();
    var localData = await getData(storageKeys.loginDetails)
    var accessToken = ""
    if (localData && localData.accessToken) {
      accessToken = localData.accessToken
    }  

    this.setState({
      accessToken:accessToken
    })

  }



  render() {
    return (
      <Provider store={store}>
        <RootNavigation accessToken={this.state.accessToken}/>
      </Provider>
    );
  }
}

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
export default App;
