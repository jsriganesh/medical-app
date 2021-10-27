//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RootNavigation from './navigations';
import store from "./src/redux/store/store";
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'

// create a component
class App extends Component {

  componentDidMount(){
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <RootNavigation />
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
